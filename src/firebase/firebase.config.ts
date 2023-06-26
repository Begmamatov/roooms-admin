// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFtqvs-9RKK6YVE7arPXHGxgbTBMMQnws",
    authDomain: "rooomsadmin1.firebaseapp.com",
    projectId: "rooomsadmin1",
    storageBucket: "rooomsadmin1.appspot.com",
    messagingSenderId: "41185052675",
    appId: "1:41185052675:web:94a36f2857381ca1982636",
    measurementId: "G-7M4WDL4BZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);