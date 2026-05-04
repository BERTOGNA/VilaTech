import * as admin from 'firebase-admin';
import serviceAccountInfo from '../../serviceAccount.json';

// Initialize Firebase Admin SDK
const serviceAccount = serviceAccountInfo as admin.ServiceAccount;

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
