import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAtbH2ZRuhEBeRTxkaBnWHs49qkh0d50ZI",
  authDomain: "proyecto-crossfit-6372e.firebaseapp.com",
  projectId: "proyecto-crossfit-6372e",
  storageBucket: "proyecto-crossfit-6372e.firebasestorage.app",
  messagingSenderId: "395924939882",
  appId: "1:395924939882:web:30785b4a8ee2fe850d5613",
  measurementId: "G-29R1D1JWJW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);