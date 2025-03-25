import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK using service account
const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
  };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;