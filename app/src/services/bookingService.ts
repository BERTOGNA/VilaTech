import api from './api';

export interface Resource {
  id: string;
  name: string;
  type: 'posicao' | 'sala' | 'auditorio';
  capacity: number;
  amenities: string[];
  pricePerHour?: number;
  isActive: boolean;
  order: number;
}

export interface Booking {
  id: string;
  resourceId: string;
  resourceName: string;
  resourceType: 'posicao' | 'sala' | 'auditorio';
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const bookingService = {
  async getResources(): Promise<Resource[]> {
    const response = await api.get<Resource[]>('/resources');
    return response.data;
  },

  async getResourceById(id: string): Promise<Resource> {
    const response = await api.get<Resource>(`/resources/${id}`);
    return response.data;
  },

  async getBookings(params?: { date?: string; resourceType?: string; status?: string; resourceId?: string }): Promise<Booking[]> {
    const response = await api.get<Booking[]>('/bookings', { params });
    return response.data;
  },

  async getMyBookings(): Promise<Booking[]> {
    const response = await api.get<Booking[]>('/bookings/my-bookings');
    return response.data;
  },

  async createBooking(data: {
    resourceId: string;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }): Promise<Booking> {
    const response = await api.post<Booking>('/bookings', data);
    return response.data;
  },

  async updateBookingStatus(id: string, status: 'confirmed' | 'cancelled' | 'pending'): Promise<Booking> {
    const response = await api.put<Booking>(`/bookings/${id}/status`, { status });
    return response.data;
  },

  async deleteBooking(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/bookings/${id}`);
    return response.data;
  },
};
