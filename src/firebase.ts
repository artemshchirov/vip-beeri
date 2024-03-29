// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, QuerySnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { TableRow } from './pages/Home/Home';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

const tableCollection = import.meta.env.VITE_FIREBASE_DB;

export const fetchRows = async (): Promise<TableRow[]> => {
  const q = collection(db, tableCollection);
  const querySnapshot: QuerySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (doc): TableRow => ({
      id: doc.id,
      name: doc.data().name,
      date: doc.data().date,
      note: doc.data().note,
      time: doc.data().time,
    })
  );
};

export const saveRow = async (row: TableRow) => {
  const q = collection(db, tableCollection);

  await addDoc(q, row);
};

export const deleteRow = async (rowId: TableRow['id']) => {
  const rowDocRef = doc(db, tableCollection, rowId);
  await deleteDoc(rowDocRef);
};
