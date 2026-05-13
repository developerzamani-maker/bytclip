import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-auth-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "bytclip",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-storage-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "demo-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id",
};

// Initialize Firebase as a singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Use Emulator Suite in development
if (process.env.NODE_ENV === "development") {
  // Check if we are in the browser to avoid connecting multiple times during SSR HMR
  const isBrowser = typeof window !== "undefined";
  
  // We use a global variable to prevent reconnecting the emulator multiple times in Next.js Dev Mode
  const globalAny: any = global;
  if (!globalAny.FIREBASE_EMULATOR_CONNECTED) {
    console.log("Connecting to Firebase Local Emulator Suite...");
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    globalAny.FIREBASE_EMULATOR_CONNECTED = true;
  }
}

export { app, db };
