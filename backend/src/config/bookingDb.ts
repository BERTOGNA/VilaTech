import { db } from './firebase';
import * as fs from 'fs';
import * as path from 'path';
import { Resource, Booking } from '../models/bookingTypes';

const LOCAL_DATA_DIR = path.join(__dirname, '../../local_db');
const RESOURCES_FILE = path.join(LOCAL_DATA_DIR, 'resources.json');
const BOOKINGS_FILE = path.join(LOCAL_DATA_DIR, 'bookings.json');

// Ensure local db directory and files exist
if (!fs.existsSync(LOCAL_DATA_DIR)) {
  fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
}
if (!fs.existsSync(RESOURCES_FILE)) {
  fs.writeFileSync(RESOURCES_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
}

// Local File DB Helpers
const readLocalResources = (): Resource[] => {
  try {
    return JSON.parse(fs.readFileSync(RESOURCES_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
};

const writeLocalResources = (data: Resource[]) => {
  fs.writeFileSync(RESOURCES_FILE, JSON.stringify(data, null, 2));
};

const readLocalBookings = (): Booking[] => {
  try {
    return JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
};

const writeLocalBookings = (data: Booking[]) => {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(data, null, 2));
};

// Flag to force local mode if Firestore fails
let useLocalFallback = false;

export const bookingDb = {
  async getResources(): Promise<Resource[]> {
    if (!useLocalFallback) {
      try {
        const snapshot = await db.collection('resources').where('isActive', '==', true).orderBy('order', 'asc').get();
        const resources: Resource[] = [];
        snapshot.forEach((doc) => {
          resources.push({ id: doc.id, ...doc.data() } as Resource);
        });
        return resources;
      } catch (error) {
        console.warn('Firestore failed, falling back to local JSON for resources:', error);
        useLocalFallback = true;
      }
    }
    return readLocalResources().filter(r => r.isActive).sort((a, b) => a.order - b.order);
  },

  async getResourceById(id: string): Promise<Resource | null> {
    if (!useLocalFallback) {
      try {
        const doc = await db.collection('resources').doc(id).get();
        if (doc.exists) {
          return { id: doc.id, ...doc.data() } as Resource;
        }
        return null;
      } catch (error) {
        console.warn('Firestore failed, falling back to local JSON for resource lookup:', error);
        useLocalFallback = true;
      }
    }
    const resources = readLocalResources();
    return resources.find(r => r.id === id) || null;
  },

  async saveResource(resource: Resource): Promise<void> {
    if (!useLocalFallback) {
      try {
        await db.collection('resources').doc(resource.id).set(resource);
        return;
      } catch (error) {
        console.warn('Firestore failed, saving resource locally:', error);
        useLocalFallback = true;
      }
    }
    const resources = readLocalResources();
    const index = resources.findIndex(r => r.id === resource.id);
    if (index > -1) {
      resources[index] = resource;
    } else {
      resources.push(resource);
    }
    writeLocalResources(resources);
  },

  async updateResource(id: string, updates: Partial<Resource>): Promise<Resource | null> {
    if (!useLocalFallback) {
      try {
        const docRef = db.collection('resources').doc(id);
        const doc = await docRef.get();
        if (doc.exists) {
          await docRef.update(updates);
          return { id, ...doc.data(), ...updates } as Resource;
        }
        return null;
      } catch (error) {
        console.warn('Firestore failed, updating resource locally:', error);
        useLocalFallback = true;
      }
    }
    const resources = readLocalResources();
    const index = resources.findIndex(r => r.id === id);
    if (index > -1) {
      resources[index] = { ...resources[index], ...updates };
      writeLocalResources(resources);
      return resources[index];
    }
    return null;
  },

  async getBookings(filters?: { date?: string; resourceType?: string; status?: string; resourceId?: string }): Promise<Booking[]> {
    if (!useLocalFallback) {
      try {
        let query: FirebaseFirestore.Query = db.collection('bookings');
        if (filters?.date) query = query.where('date', '==', filters.date);
        if (filters?.resourceType) query = query.where('resourceType', '==', filters.resourceType);
        if (filters?.status) query = query.where('status', '==', filters.status);
        if (filters?.resourceId) query = query.where('resourceId', '==', filters.resourceId);

        const snapshot = await query.orderBy('createdAt', 'desc').get();
        const bookings: Booking[] = [];
        snapshot.forEach((doc) => {
          bookings.push({ id: doc.id, ...doc.data() } as Booking);
        });
        return bookings;
      } catch (error) {
        console.warn('Firestore failed, fetching bookings locally:', error);
        useLocalFallback = true;
      }
    }

    let bookings = readLocalBookings();
    if (filters?.date) bookings = bookings.filter(b => b.date === filters.date);
    if (filters?.resourceType) bookings = bookings.filter(b => b.resourceType === filters.resourceType);
    if (filters?.status) bookings = bookings.filter(b => b.status === filters.status);
    if (filters?.resourceId) bookings = bookings.filter(b => b.resourceId === filters.resourceId);
    
    return bookings.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async getUserBookings(userId: string): Promise<Booking[]> {
    if (!useLocalFallback) {
      try {
        const snapshot = await db.collection('bookings')
          .where('userId', '==', userId)
          .orderBy('date', 'desc')
          .get();
        const bookings: Booking[] = [];
        snapshot.forEach((doc) => {
          bookings.push({ id: doc.id, ...doc.data() } as Booking);
        });
        return bookings;
      } catch (error) {
        console.warn('Firestore failed, fetching user bookings locally:', error);
        useLocalFallback = true;
      }
    }
    const bookings = readLocalBookings();
    return bookings.filter(b => b.userId === userId).sort((a, b) => b.date.localeCompare(a.date));
  },

  async saveBooking(booking: Booking): Promise<void> {
    if (!useLocalFallback) {
      try {
        await db.collection('bookings').doc(booking.id).set(booking);
        return;
      } catch (error) {
        console.warn('Firestore failed, saving booking locally:', error);
        useLocalFallback = true;
      }
    }
    const bookings = readLocalBookings();
    bookings.push(booking);
    writeLocalBookings(bookings);
  },

  async getBookingById(id: string): Promise<Booking | null> {
    if (!useLocalFallback) {
      try {
        const doc = await db.collection('bookings').doc(id).get();
        if (doc.exists) {
          return { id: doc.id, ...doc.data() } as Booking;
        }
        return null;
      } catch (error) {
        console.warn('Firestore failed, looking up booking locally:', error);
        useLocalFallback = true;
      }
    }
    const bookings = readLocalBookings();
    return bookings.find(b => b.id === id) || null;
  },

  async updateBookingStatus(id: string, status: 'confirmed' | 'cancelled' | 'pending', updatedAt: string): Promise<Booking | null> {
    if (!useLocalFallback) {
      try {
        const docRef = db.collection('bookings').doc(id);
        const doc = await docRef.get();
        if (doc.exists) {
          await docRef.update({ status, updatedAt });
          return { id, ...doc.data(), status, updatedAt } as Booking;
        }
        return null;
      } catch (error) {
        console.warn('Firestore failed, updating booking status locally:', error);
        useLocalFallback = true;
      }
    }
    const bookings = readLocalBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index > -1) {
      bookings[index] = { ...bookings[index], status, updatedAt };
      writeLocalBookings(bookings);
      return bookings[index];
    }
    return null;
  },

  async deleteBooking(id: string): Promise<boolean> {
    if (!useLocalFallback) {
      try {
        await db.collection('bookings').doc(id).delete();
        return true;
      } catch (error) {
        console.warn('Firestore failed, deleting booking locally:', error);
        useLocalFallback = true;
      }
    }
    const bookings = readLocalBookings();
    const filtered = bookings.filter(b => b.id !== id);
    if (filtered.length !== bookings.length) {
      writeLocalBookings(filtered);
      return true;
    }
    return false;
  }
};
