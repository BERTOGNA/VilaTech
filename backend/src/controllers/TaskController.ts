import { Request, Response } from 'express';
import { db } from '../config/firebase';

export class TaskController {
  
  static async getTasks(req: Request, res: Response) {
    try {
      const { leadId, status } = req.query;
      let query: any = db.collection('tasks');

      if (leadId) {
        query = query.where('leadId', '==', leadId);
      }
      if (status) {
        query = query.where('status', '==', status);
      }

      const snapshot = await query.orderBy('dueDate', 'asc').get();
      const tasks = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));

      return res.status(200).json({ items: tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return res.status(500).json({ error: 'Internal server error while fetching tasks' });
    }
  }

  static async createTask(req: Request, res: Response) {
    try {
      const { title, description, dueDate, leadId, leadName, priority, category } = req.body;

      if (!title || !dueDate) {
        return res.status(400).json({ error: 'Title and dueDate are required' });
      }

      const newTask = {
        title,
        description: description || '',
        dueDate,
        leadId: leadId || null,
        leadName: leadName || '',
        status: 'pending',
        priority: priority || 'medium',
        category: category || 'other',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const docRef = await db.collection('tasks').add(newTask);
      return res.status(201).json({ id: docRef.id, ...newTask });
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(500).json({ error: 'Internal server error while creating task' });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const docRef = db.collection('tasks').doc(id as string);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Validar campos se necessário ou apenas repassar o body
      const dataToUpdate = {
          ...updateData,
          updated_at: new Date().toISOString()
      };

      await docRef.update(dataToUpdate);

      const updatedDoc = await docRef.get();
      return res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (error) {
      console.error('Error updating task:', error);
      return res.status(500).json({ error: 'Internal server error while updating task' });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const docRef = db.collection('tasks').doc(id as string);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await docRef.delete();
      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      return res.status(500).json({ error: 'Internal server error while deleting task' });
    }
  }
}
