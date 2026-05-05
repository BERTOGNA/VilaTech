import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
let serviceAccount: admin.ServiceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT env var:', error);
    throw error;
  }
} else {
  // Fallback for local development - using try-catch to avoid build errors if file is missing
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    serviceAccount = require('../../serviceAccount.json');
  } catch (error) {
    console.error('Firebase Service Account not found. Set FIREBASE_SERVICE_ACCOUNT env var or provide serviceAccount.json');
    throw error;
  }
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
