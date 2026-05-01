import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from './firebase';

export async function loginAdmin(email: string, password: string) {
  if (!auth) throw new Error('Firebase Auth is not configured.');
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin() {
  if (!auth) return;
  return signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  if (!auth) { callback(null); return () => {}; }
  return onAuthStateChanged(auth, callback);
}
