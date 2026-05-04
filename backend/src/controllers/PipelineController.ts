import { Request, Response } from 'express';
import { db } from '../config/firebase';

// Modelagem Inicial: Vamos armazenar pipelines como documentos se quisermos customizar,
// ou por agora retornar um Pipeline padrão fixado no código se a coleção estiver vazia.

const DEFAULT_PIPELINE = {
  id: 'default',
  name: 'Funil Principal',
  stages: [
    { id: 'novo', name: 'Novo', order: 0, color: 'blue' },
    { id: 'em-contato', name: 'Em Contato', order: 1, color: 'yellow' },
    { id: 'negociacao', name: 'Negociação', order: 2, color: 'orange' },
    { id: 'ganho', name: 'Convertido/Ganho', order: 3, color: 'green' },
    { id: 'perdido', name: 'Perdido', order: 4, color: 'red' }
  ]
};

export class PipelineController {
  
  static async getPipelines(req: Request, res: Response) {
    try {
      const pipelinesRef = db.collection('pipelines');
      const snapshot = await pipelinesRef.get();
      
      let pipelines: any[] = [];
      
      if (snapshot.empty) {
        pipelines = [DEFAULT_PIPELINE];
      } else {
        snapshot.forEach(doc => {
          pipelines.push({ id: doc.id, ...doc.data() });
        });
        // Sort by created_at or name if needed
        pipelines.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      }

      return res.status(200).json({ items: pipelines });
    } catch (error) {
      console.error('Error fetching pipelines:', error);
      return res.status(500).json({ error: 'Internal server error while fetching pipelines' });
    }
  }

  static async createPipeline(req: Request, res: Response) {
    try {
      const { name, stages } = req.body;

      if (!name || !stages || !Array.isArray(stages)) {
        return res.status(400).json({ error: 'Name and stages array are required' });
      }

      const newPipeline = {
        name,
        stages: stages.map((s, index) => ({
            id: s.id || `stage-${Date.now()}-${index}`,
            name: s.name,
            color: s.color || 'blue',
            order: s.order !== undefined ? s.order : index
        })),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const docRef = await db.collection('pipelines').add(newPipeline);
      return res.status(201).json({ id: docRef.id, ...newPipeline });
    } catch (error) {
      console.error('Error creating pipeline:', error);
      return res.status(500).json({ error: 'Internal server error while creating pipeline' });
    }
  }

  static async updatePipeline(req: Request, res: Response) {
      try {
          const id = req.params.id as string;
          const { name, stages } = req.body;

          const docRef = db.collection('pipelines').doc(id);
          const doc = await docRef.get();

          if (!doc.exists && id !== 'default') {
              return res.status(404).json({ error: 'Pipeline not found' });
          }

          const updateData: any = {
              updated_at: new Date().toISOString()
          };
          if (name) updateData.name = name;
          if (stages) updateData.stages = stages;

          if (id === 'default' && !doc.exists) {
              // Se tentar atualizar o padrão mas ele não existe no banco, cria ele
              const fullData = { ...DEFAULT_PIPELINE, ...updateData };
              await db.collection('pipelines').doc('default').set(fullData);
              return res.status(200).json({ id: 'default', ...fullData });
          }

          await docRef.update(updateData);
          const updatedDoc = await docRef.get();
          return res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
      } catch (error) {
          console.error('Error updating pipeline:', error);
          return res.status(500).json({ error: 'Internal server error while updating pipeline' });
      }
  }

  static async deletePipeline(req: Request, res: Response) {
      try {
          const id = req.params.id as string;
          if (id === 'default') {
              return res.status(400).json({ error: 'Cannot delete default pipeline' });
          }

          const docRef = db.collection('pipelines').doc(id);
          const doc = await docRef.get();

          if (!doc.exists) {
              return res.status(404).json({ error: 'Pipeline not found' });
          }

          await docRef.delete();
          return res.status(200).json({ message: 'Pipeline deleted successfully' });
      } catch (error) {
          console.error('Error deleting pipeline:', error);
          return res.status(500).json({ error: 'Internal server error while deleting pipeline' });
      }
  }
}
