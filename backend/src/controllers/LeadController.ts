import { Request, Response } from 'express';
import { db } from '../config/firebase';

export const createOrUpdateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      form_id,
      name,
      email,
      phone,
      city,
      state,
      type,
      subtype,
      source_url,
      utm_source,
      utm_medium,
      utm_campaign,
      extra_fields
    } = req.body;

    if (!email || !name) {
      res.status(422).json({
        status: 'error',
        error: 'validation_error',
        details: {
          email: !email ? ['Email é obrigatório'] : undefined,
          name: !name ? ['Nome é obrigatório'] : undefined
        }
      });
      return;
    }

    const leadsRef = db.collection('leads');
    // Procurar lead pelo email
    const snapshot = await leadsRef.where('email', '==', email).limit(1).get();

    let leadId: string;
    let leadData: any;
    let statusAction = 'created';

    const timestamp = new Date().toISOString();

    const historyEntry = {
      type: 'form_submission',
      form_id: form_id || 'unknown',
      created_at: timestamp,
      metadata: {
        subtype,
        type
      }
    };

    if (snapshot.empty) {
      // Criar novo lead
      const newRef = leadsRef.doc();
      leadId = newRef.id;
      leadData = {
        id: leadId,
        name,
        email,
        phone: phone || '',
        city: city || '',
        state: state || '',
        types: type ? [type] : [],
        subtypes: subtype ? [subtype] : [],
        status: 'novo',
        pipeline_id: 'default',
        stage_id: 'novo',
        tags: form_id ? [`form_${form_id}`] : [],
        origin: {
          first_source_url: source_url || '',
          first_utm_source: utm_source || '',
          first_utm_medium: utm_medium || '',
          first_utm_campaign: utm_campaign || ''
        },
        extra_fields: extra_fields || {},
        history: [historyEntry],
        created_at: timestamp,
        updated_at: timestamp
      };

      await newRef.set(leadData);
    } else {
      // Atualizar lead existente (Upsert)
      statusAction = 'updated';
      const existingDoc = snapshot.docs[0];
      leadId = existingDoc.id;
      const existingData = existingDoc.data();

      // Mesclar arrays de types e subtypes sem duplicatas
      const updatedTypes = Array.from(new Set([...(existingData.types || []), ...(type ? [type] : [])]));
      const updatedSubtypes = Array.from(new Set([...(existingData.subtypes || []), ...(subtype ? [subtype] : [])]));
      const updatedTags = Array.from(new Set([...(existingData.tags || []), ...(form_id ? [`form_${form_id}`] : [])]));

      const newHistory = [...(existingData.history || []), historyEntry];

      const extraFieldsMerged = {
          ...(existingData.extra_fields || {}),
          ...(extra_fields || {})
      };

      leadData = {
        ...existingData,
        name: existingData.name || name, // Só atualiza se o antigo estiver vazio
        phone: existingData.phone || phone || '',
        city: existingData.city || city || '',
        state: existingData.state || state || '',
        types: updatedTypes,
        subtypes: updatedSubtypes,
        tags: updatedTags,
        extra_fields: extraFieldsMerged,
        history: newHistory,
        updated_at: timestamp
      };

      await existingDoc.ref.update(leadData);
    }

    res.status(statusAction === 'created' ? 201 : 200).json({
      status: `success_${statusAction}`,
      lead: leadData
    });
  } catch (error: any) {
    console.error('Error creating/updating lead:', error);
    res.status(500).json({ status: 'error', error: 'internal_server_error', message: error?.message || String(error) });
  }
};

export const getLeads = async (req: Request, res: Response): Promise<void> => {
    try {
        const leadsRef = db.collection('leads');
        const snapshot = await leadsRef.orderBy('created_at', 'desc').get();
        const leads = snapshot.docs.map(doc => doc.data());
        res.json({
            items: leads
        });
    } catch (error: any) {
        console.error('Error getting leads:', error);
        res.status(500).json({ status: 'error', error: 'internal_server_error', message: error?.message || String(error) });
    }
};

export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const docRef = db.collection('leads').doc(id as string);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    
    res.json(doc.data());
  } catch (error: any) {
    console.error('Error getting lead:', error);
    res.status(500).json({ status: 'error', error: 'internal_server_error', message: error?.message || String(error) });
  }
};

export const updateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const docRef = db.collection('leads').doc(id as string);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    
    updateData.updated_at = new Date().toISOString();
    
    await docRef.update(updateData);
    
    const updatedDoc = await docRef.get();
    res.json(updatedDoc.data());
  } catch (error: any) {
    console.error('Error updating lead:', error);
    res.status(500).json({ status: 'error', error: 'internal_server_error', message: error?.message || String(error) });
  }
};

export const updateLeadStage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { pipeline_id, stage_id } = req.body;
    
    if (!pipeline_id || !stage_id) {
      res.status(400).json({ error: 'pipeline_id and stage_id are required' });
      return;
    }

    const docRef = db.collection('leads').doc(id as string);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    
    const updateData = {
      pipeline_id,
      stage_id,
      updated_at: new Date().toISOString()
    };
    
    await docRef.update(updateData);
    
    const updatedDoc = await docRef.get();
    res.json(updatedDoc.data());
  } catch (error: any) {
    console.error('Error updating lead stage:', error);
    res.status(500).json({ status: 'error', error: 'internal_server_error', message: error?.message || String(error) });
  }
};
