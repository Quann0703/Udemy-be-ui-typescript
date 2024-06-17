import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGZ0PqpWG4wV5ARIueHXmUSQ4xh8iin5s",
  authDomain: "udemy-db-65d61.firebaseapp.com",
  projectId: "udemy-db-65d61",
  storageBucket: "udemy-db-65d61.appspot.com",
  messagingSenderId: "457021763559",
  appId: "1:457021763559:web:ded43ba76d56100ca39742",
  measurementId: "G-5NW7SVGQVJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
