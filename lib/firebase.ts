import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  type Firestore,
  type QueryConstraint,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

export const firebaseApp: FirebaseApp | null = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null;
export const auth = firebaseApp ? getAuth(firebaseApp) : null;

function requireDb() {
  if (!db) throw new Error('Firebase is not configured.');
  return db;
}

export async function getCollection<T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> {
  const snapshot = await getDocs(query(collection(requireDb(), collectionName), ...constraints));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function getFirstFromCollection<T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
): Promise<T | null> {
  const results = await getCollection<T>(collectionName, [...constraints, limit(1)]);
  return results[0] ?? null;
}

export async function getDocument<T>(collectionName: string, id: string): Promise<T | null> {
  const snapshot = await getDoc(doc(requireDb(), collectionName, id));
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : null;
}

export async function addToCollection<T extends Record<string, unknown>>(collectionName: string, data: T) {
  return addDoc(collection(requireDb(), collectionName), data);
}

export async function setDocument<T extends Record<string, unknown>>(
  collectionName: string,
  id: string,
  data: T,
) {
  return setDoc(doc(requireDb(), collectionName, id), data, { merge: true });
}

export async function deleteDocument(collectionName: string, id: string) {
  return deleteDoc(doc(requireDb(), collectionName, id));
}

export const firebaseQuery = { limit, orderBy, where };
