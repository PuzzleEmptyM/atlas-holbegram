import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBa-LTMxyVM8DxSWo_wx4YUIHZhc7RcISg",
  authDomain: "holbegram-43d2e.firebaseapp.com",
  projectId: "holbegram-43d2e",
  storageBucket: "holbegram-43d2e.appspot.com",
  messagingSenderId: "174556821455",
  appId: "1:174556821455:web:9cb7aa6b92a9f0c6a9c4ba"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
