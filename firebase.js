// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import storage
import { storage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALmxpGzlM_6dyviUMvy_AHdxbzTj20G-8",
  authDomain: "valen-tines.firebaseapp.com",
  projectId: "valen-tines",
  storageBucket: "valen-tines.appspot.com",
  messagingSenderId: "663205387440",
  appId: "1:663205387440:web:53724105a5edc243e22f75",
  measurementId: "G-TGPXF7Q6KH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
