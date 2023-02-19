// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID
// };

// FIXME move to .env
const firebaseConfig = {
  apiKey: 'AIzaSyBXixAp03PgzmRbq3yNzC2D3a_wdLOZ6VM',
  authDomain: 'authDomain',
  projectId: 'work-calendar-vip',
  storageBucket: 'work-calendar-vip.appspot.com',
  messagingSenderId: '808021288157',
  appId: '1:808021288157:web:8823df99a48f253c8c2734'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()