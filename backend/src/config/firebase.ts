import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
let serviceAccount: admin.ServiceAccount | undefined;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT env var:', error);
  }
} else {
  // Fallback for local development
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    serviceAccount = require('../../serviceAccount.json');
  } catch (error) {
    console.warn('Firebase Service Account not found. Running in local fallback mode.');
  }
}

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'vila-tech-hub'
    });
  }
}

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

