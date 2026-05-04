import { db } from './src/config/firebase';

async function test() {
  try {
    console.log('Testing firestore connection...');
    const snapshot = await db.collection('leads').limit(1).get();
    console.log('Success! Documents found:', snapshot.size);
    process.exit(0);
  } catch (err) {
    console.error('Fatal Error connecting to Firestore:');
    console.error(err);
    process.exit(1);
  }
}

test();
