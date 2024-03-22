// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_v9rnxNww75lXF_wXPSYJKa48FmEUgRs",
  authDomain: "todo-firabase-c1f9c.firebaseapp.com",
  projectId: "todo-firabase-c1f9c",
  storageBucket: "todo-firabase-c1f9c.appspot.com",
  messagingSenderId: "1098207023018",
  appId: "1:1098207023018:web:9d2e028d1a05f7572aa5d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
