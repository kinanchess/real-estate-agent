// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-f7343.firebaseapp.com",
  projectId: "real-estate-f7343",
  storageBucket: "real-estate-f7343.appspot.com",
  messagingSenderId: "764827413664",
  appId: "1:764827413664:web:781e1dc4fdcda95c706dc5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);