import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

// Look for service account in the parent directory of src
const serviceAccountPath = path.join(__dirname, '../../serviceAccount.json');

if (!fs.existsSync(serviceAccountPath)) {
    console.error('Service account file not found at:', serviceAccountPath);
    process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.log('Usage: npx ts-node src/scripts/create-admin.ts <email> <password>');
    process.exit(1);
}

async function createAdmin() {
    try {
        const user = await admin.auth().createUser({
            email,
            password,
            emailVerified: true
        });
        console.log('Successfully created new user:', user.uid);
        process.exit(0);
    } catch (error: any) {
        if (error.code === 'auth/email-already-exists') {
            console.log('User already exists, attempting to update password...');
            try {
                const existingUser = await admin.auth().getUserByEmail(email);
                await admin.auth().updateUser(existingUser.uid, { password });
                console.log('Successfully updated password for user:', existingUser.uid);
                process.exit(0);
            } catch (updateError) {
                console.error('Error updating user:', updateError);
                process.exit(1);
            }
        } else {
            console.error('Error creating user:', error);
            process.exit(1);
        }
    }
}

createAdmin();
