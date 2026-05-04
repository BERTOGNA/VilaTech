import axios from 'axios';
import { auth } from '../config/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

// Add a request interceptor to add the Firebase ID token to all requests
api.interceptors.request.use(
  async (config) => {
    if (auth?.currentUser) {
      try {
        const idToken = await auth.currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${idToken}`;
      } catch (error) {
        console.error('Error getting ID token:', error);
      }
    } else {
        // Fallback to static token for leads from public site if needed, 
        // though usually admin actions require the Firebase token.
        const staticToken = import.meta.env.VITE_API_TOKEN;
        if (staticToken) {
            config.headers.Authorization = `Bearer ${staticToken}`;
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
