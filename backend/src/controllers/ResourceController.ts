import { Request, Response } from 'express';
import { bookingDb } from '../config/bookingDb';
import { Resource } from '../models/bookingTypes';

export const getResources = async (req: Request, res: Response): Promise<void> => {
  try {
    const resources = await bookingDb.getResources();
    res.json(resources);
  } catch (error: any) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Erro ao buscar recursos', details: error.message });
  }
};

export const getResourceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const resource = await bookingDb.getResourceById(id as string);
    
    if (!resource) {
      res.status(404).json({ error: 'Recurso não encontrado' });
      return;
    }

    res.json(resource);
  } catch (error: any) {
    console.error('Error fetching resource by ID:', error);
    res.status(500).json({ error: 'Erro ao buscar recurso', details: error.message });
  }
};

export const createResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, type, capacity, amenities, pricePerHour, order } = req.body;

    if (!name || !type || capacity === undefined) {
      res.status(400).json({ error: 'Campos obrigatórios ausentes: name, type, capacity' });
      return;
    }

    const newId = id || `${type}-${Date.now()}`;
    const newResource: Resource = {
      id: newId,
      name,
      type,
      capacity,
      amenities: amenities || [],
      pricePerHour: pricePerHour || 0,
      isActive: true,
      order: order || 0,
    };

    await bookingDb.saveResource(newResource);
    res.status(201).json(newResource);
  } catch (error: any) {
    console.error('Error creating resource:', error);
    res.status(500).json({ error: 'Erro ao criar recurso', details: error.message });
  }
};

export const updateResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await bookingDb.updateResource(id as string, updates);
    if (!updated) {
      res.status(404).json({ error: 'Recurso não encontrado' });
      return;
    }

    res.json(updated);
  } catch (error: any) {
    console.error('Error updating resource:', error);
    res.status(500).json({ error: 'Erro ao atualizar recurso', details: error.message });
  }
};

export const deleteResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await bookingDb.updateResource(id as string, { isActive: false });
    if (!updated) {
      res.status(404).json({ error: 'Recurso não encontrado' });
      return;
    }

    res.json({ message: 'Recurso desativado com sucesso' });
  } catch (error: any) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ error: 'Erro ao desativar recurso', details: error.message });
  }
};
