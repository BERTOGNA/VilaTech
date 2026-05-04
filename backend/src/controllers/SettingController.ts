import { Request, Response } from 'express';
import { db } from '../config/firebase';

export class SettingController {
  static async getSettings(req: Request, res: Response) {
    try {
      const settingsDoc = await db.collection('settings').doc('unit_settings').get();
      
      if (!settingsDoc.exists) {
        // Return default settings if none exist
        return res.json({
          unitName: 'Vila Tech Hub Central',
          unitEmail: 'comercial@vilatech.com.br'
        });
      }
      
      res.json(settingsDoc.data());
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  }

  static async updateSettings(req: Request, res: Response) {
    try {
      const { unitName, unitEmail } = req.body;
      
      await db.collection('settings').doc('unit_settings').set({
        unitName,
        unitEmail,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      res.json({ message: 'Settings updated successfully' });
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(500).json({ error: 'Failed to update settings' });
    }
  }
}
