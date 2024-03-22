// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.YOUR_API_KEY,
  authDomain: process.env.YOUR_AUTHDOMAIN,
  projectId: process.env.YOUR_PROJECTID,
  storageBucket: process.env.YOUR_STORAGEBUCKET,
  messagingSenderId: process.env.YOUR_MESSAGING_SENDER_ID,
  appId: process.env.YOUR_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
