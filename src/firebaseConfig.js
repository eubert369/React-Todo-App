// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJklTn-6imcRHHdxy8qRn6VUEQLMOUF6A",
  authDomain: "todo-project-564f9.firebaseapp.com",
  projectId: "todo-project-564f9",
  storageBucket: "todo-project-564f9.appspot.com",
  messagingSenderId: "629317319349",
  appId: "1:629317319349:web:95ddd01ccb89cec3559cfc",
  measurementId: "G-WJCLLG35DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);