// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfFpv-7tpjyo_WT-thyI2jP6FNpgcQYr4",
  authDomain: "linkasa-backup.firebaseapp.com",
  projectId: "linkasa-backup",
  storageBucket: "linkasa-backup.appspot.com",
  messagingSenderId: "270608712567",
  appId: "1:270608712567:web:5de65570ab991a4c641772",
  measurementId: "G-PQ40CC5E7W"
};

// Initialize Firebase - SINGLETON
const initFirebaseApp = () => {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp(); // Return the already initialized app
};

const app = initFirebaseApp();
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};