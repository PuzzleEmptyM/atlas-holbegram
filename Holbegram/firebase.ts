import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBa-LTMxyVM8DxSWo_wx4YUIHZhc7RcISg",
  authDomain: "holbegram-43d2e.firebaseapp.com",
  projectId: "holbegram-43d2e",
  storageBucket: "holbegram-43d2e.appspot.com",
  messagingSenderId: "174556821455",
  appId: "1:174556821455:web:9cb7aa6b92a9f0c6a9c4ba"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
