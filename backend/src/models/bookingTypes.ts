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
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
