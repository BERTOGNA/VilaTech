import { Request, Response } from 'express';
import { bookingDb } from '../config/bookingDb';
import { Booking, Resource } from '../models/bookingTypes';

// Helper to check if two time ranges overlap
const hasTimeOverlap = (start1: string, end1: string, start2: string, end2: string): boolean => {
  return start1 < end2 && end1 > start2;
};

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { resourceId, date, startTime, endTime, notes } = req.body;
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return;
    }

    if (!resourceId || !date || !startTime || !endTime) {
      res.status(400).json({ error: 'Campos obrigatórios ausentes: resourceId, date, startTime, endTime' });
      return;
    }

    // 1. Get Resource to check if it exists and is active
    const resource = await bookingDb.getResourceById(resourceId);
    if (!resource) {
      res.status(404).json({ error: 'Recurso não encontrado' });
      return;
    }
    if (!resource.isActive) {
      res.status(400).json({ error: 'Este recurso está inativo e não pode ser reservado' });
      return;
    }

    // 2. Get existing bookings for this resource on this date
    const existingBookings = await bookingDb.getBookings({ resourceId, date });
    
    let overlapFound = false;
    existingBookings.forEach((b) => {
      if (b.status !== 'cancelled' && hasTimeOverlap(startTime, endTime, b.startTime, b.endTime)) {
        overlapFound = true;
      }
    });

    if (overlapFound) {
      res.status(409).json({ 
        error: 'Conflito de agendamento', 
        message: 'Este horário já está reservado por outro usuário.' 
      });
      return;
    }

    // 3. Create the booking
    const bookingId = `booking-${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const newBooking: Booking = {
      id: bookingId,
      resourceId,
      resourceName: resource.name,
      resourceType: resource.type,
      userId: user.uid,
      userName: user.name || user.email || 'Usuário Vila Tech',
      userEmail: user.email || '',
      userPhone: user.phone_number || '',
      date,
      startTime,
      endTime,
      status: resource.type === 'posicao' ? 'confirmed' : 'pending', // Posições são automáticas, salas/auditório precisam de aprovação
      notes: notes || '',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await bookingDb.saveBooking(newBooking);
    res.status(201).json(newBooking);
  } catch (error: any) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Erro ao processar reserva', details: error.message });
  }
};

export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, resourceType, status } = req.query;
    
    const bookings = await bookingDb.getBookings({
      date: date as string,
      resourceType: resourceType as string,
      status: status as string
    });

    res.json(bookings);
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Erro ao buscar reservas', details: error.message });
  }
};

export const getMyBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return;
    }

    const bookings = await bookingDb.getUserBookings(user.uid);
    res.json(bookings);
  } catch (error: any) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Erro ao buscar suas reservas', details: error.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ error: 'Não autorizado' });
      return;
    }

    if (!status || !['confirmed', 'cancelled', 'pending'].includes(status)) {
      res.status(400).json({ error: 'Status inválido' });
      return;
    }

    const booking = await bookingDb.getBookingById(id as string);
    if (!booking) {
      res.status(404).json({ error: 'Reserva não encontrada' });
      return;
    }

    const isAdmin = user.email && user.email.includes('admin');
    const isOwner = booking.userId === user.uid;

    if (!isAdmin && !isOwner) {
      res.status(403).json({ error: 'Sem permissão para alterar esta reserva' });
      return;
    }

    const timestamp = new Date().toISOString();
    const updated = await bookingDb.updateBookingStatus(id as string, status, timestamp);

    res.json(updated);
  } catch (error: any) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Erro ao atualizar status da reserva', details: error.message });
  }
};

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await bookingDb.deleteBooking(id as string);
    if (!deleted) {
      res.status(404).json({ error: 'Reserva não encontrada' });
      return;
    }

    res.json({ message: 'Reserva excluída com sucesso' });
  } catch (error: any) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Erro ao excluir reserva', details: error.message });
  }
};
