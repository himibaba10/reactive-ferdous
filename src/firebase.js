import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// NOTE: Firestore writes are deliberately unauthenticated — the site has no
// login. The admin pages (/admin/*, /dashboard/*) are protected only by an
// unguessable URL, and are marked noindex and disallowed in public/robots.txt.
//
// The practical consequence: the projects, reviews and logos collections are
// publicly writable. Anyone who reads the project id out of the shipped JS
// bundle can add, change or delete documents. That is an accepted trade-off for
// keeping the site login-free. Firestore rules plus Firebase Auth would close
// it if that decision ever changes.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
