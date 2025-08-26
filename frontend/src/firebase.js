// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9ah0SPOw3RYp9HXuQIThK1trU6KODdK0",
    authDomain: "todobee-31654.firebaseapp.com",
    projectId: "todobee-31654",
    storageBucket: "todobee-31654.firebasestorage.app",
    messagingSenderId: "933858634897",
    appId: "1:933858634897:web:4bda736dd7addda37fe330",
    measurementId: "G-3SNZ0SBVY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);