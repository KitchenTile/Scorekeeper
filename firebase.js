import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import {
//   EXPO_PUBLIC_FIREBASE_API_KEY,
//   EXPO_PUBLIC_FIREBASE_APP_ID,
//   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
//   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//   EXPO_PUBLIC_FIREBASE_STOREBUCKET,
// } from ".env";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STOREBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDTgE9HztFGlOyado6clRouR6pT1T1dIao",
//   authDomain: "vb-scorekeeper-659a7.firebaseapp.com",
//   projectId: "vb-scorekeeper-659a7",
//   storageBucket: "vb-scorekeeper-659a7.firebasestorage.app",
//   messagingSenderId: "1022064983531",
//   appId: "1:1022064983531:web:3db6c18c50ebaf65616dae",
//   measurementId: "G-QGSBHHQ2GZ",
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
