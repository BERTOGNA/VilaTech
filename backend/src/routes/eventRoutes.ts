import { Router, Request, Response } from 'express';
import { db } from '../config/firebase';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Endpoint público para retornar todos os eventos ordenados por data
router.get('/', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('events').get();
    const events: any[] = [];
    
    snapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });

    // Ordenar os eventos por dataISO e depois por inicio
    events.sort((a, b) => {
      const dateA = a.dataISO || '';
      const dateB = b.dataISO || '';
      if (dateA !== dateB) {
        return dateA.localeCompare(dateB);
      }
      return (a.inicio || '').localeCompare(b.inicio || '');
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Endpoint seguro para sincronizar dados do Google Sheets
router.post('/sync', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { events } = req.body;

    if (!Array.isArray(events)) {
      res.status(400).json({ error: 'Invalid payload: "events" must be an array' });
      return;
    }

    console.log(`Received ${events.length} events from Google Sheets for synchronization.`);

    // 1. Buscar todos os IDs existentes para podermos limpar o banco
    const existingDocs = await db.collection('events').get();
    
    // 2. Preparar gravação em lote (Firebase Firestore Batch)
    // Nota: O limite do Firestore é 500 operações por lote.
    // Faremos em lotes separados se necessário.
    let batch = db.batch();
    let operationCount = 0;

    // Excluir todos os registros existentes para evitar duplicatas/órfãos
    existingDocs.forEach((doc) => {
      batch.delete(doc.ref);
      operationCount++;
      if (operationCount >= 400) {
        // Envia o lote e inicia um novo para evitar bater o limite de 500
        batch.commit();
        batch = db.batch();
        operationCount = 0;
      }
    });

    // 3. Inserir os novos eventos
    for (const event of events) {
      // Validar campos básicos
      if (!event.titulo || !event.data) continue;

      // Tratar e converter a data (DD/MM/YYYY) para ISO (YYYY-MM-DD) para fins de ordenação
      let dataISO = '';
      let mesParsed = '';
      if (typeof event.data === 'string' && event.data.includes('/')) {
        const parts = event.data.split('/');
        if (parts.length === 3) {
          // Garante formato YYYY-MM-DD
          const dia = parts[0].padStart(2, '0');
          const mesNum = parts[1].padStart(2, '0');
          const ano = parts[2];
          dataISO = `${ano}-${mesNum}-${dia}`;

          const monthIdx = parseInt(mesNum, 10);
          const MESES_ORDEM = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
          ];
          if (monthIdx >= 1 && monthIdx <= 12) {
            mesParsed = MESES_ORDEM[monthIdx - 1];
          }
        }
      }

      // Tratar speakers
      let speakersArray: string[] = [];
      if (Array.isArray(event.speakers)) {
        speakersArray = event.speakers;
      } else if (typeof event.speakers === 'string') {
        speakersArray = event.speakers
          .split(/[|,;]/)
          .map((s: string) => s.trim())
          .filter((s: string) => s.length > 0);
      }

      const cleanEvent = {
        data: event.data,
        dataISO: dataISO || event.dataISO || '',
        dia: Number(event.dia) || (event.data ? parseInt(event.data.split('/')[0], 10) : 0),
        mes: event.mes ? String(event.mes).toLowerCase() : mesParsed,
        semana: event.semana || '',
        inicio: event.inicio || '',
        fim: event.fim || '',
        tipo: event.tipo || 'Evento',
        titulo: event.titulo,
        sub: event.sub || event.subtitulo || '',
        descritivo: event.descritivo || '',
        speakers: speakersArray,
        miniBio: event.miniBio || event.miniBioPalestrante || '',
        publicoAlvo: event.publicoAlvo || '',
        modalidade: event.modalidade || 'Presencial',
        local: event.local || '',
        vagas: event.vagas || '',
        valor: event.valor || 'Gratuito',
        linkInscricao: event.linkInscricao || '',
        status: event.status || 'Confirmado',
        observacoes: event.observacoes || '',
        googleCalendarId: event.googleCalendarId || '',
        updatedAt: new Date().toISOString(),
      };

      // Se houver um ID do Google Calendar, podemos usá-lo como ID do doc, senão geramos um novo doc ref
      let docRef;
      if (cleanEvent.googleCalendarId) {
        // Higienizar o ID para evitar caracteres inválidos no Firestore ID
        const docId = cleanEvent.googleCalendarId.replace(/[^a-zA-Z0-9-_]/g, '_');
        docRef = db.collection('events').doc(docId);
      } else {
        docRef = db.collection('events').doc();
      }

      batch.set(docRef, cleanEvent);
      operationCount++;

      if (operationCount >= 400) {
        await batch.commit();
        batch = db.batch();
        operationCount = 0;
      }
    }

    // Comitar quaisquer operações restantes
    if (operationCount > 0) {
      await batch.commit();
    }

    res.json({ success: true, count: events.length });
  } catch (error) {
    console.error('Error syncing events:', error);
    res.status(500).json({ error: 'Failed to sync events' });
  }
});

export default router;
