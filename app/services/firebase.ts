import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (firebaseApp) return firebaseApp;

  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) {
      console.warn('Firebase configuration file /firebase-applet-config.json was not found.');
      return null;
    }

    const raw = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(raw);

    const firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId
    };

    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      console.warn('Firebase apiKey or projectId is missing from the configuration.');
      return null;
    }

    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    return firebaseApp;
  } catch (error) {
    console.error('Failed to initialize Firebase App:', error);
    return null;
  }
}

export function getFirestoreDb(): Firestore | null {
  if (firestoreDb) return firestoreDb;

  const app = getFirebaseApp();
  if (!app) return null;

  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    const raw = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(raw);

    const databaseId = config.firestoreDatabaseId || '(default)';

    firestoreDb = getFirestore(app, databaseId);

    console.log(`Firestore initialized successfully for database ID: ${databaseId}`);
    return firestoreDb;
  } catch (error) {
    console.error('Failed to initialize Firestore database client:', error);
    return null;
  }
}
