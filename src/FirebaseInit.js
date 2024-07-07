// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBBpjV8U74xCaDO3vogX1Odw5IbcyvNCg4",
//   authDomain: "dormitoryautomation.firebaseapp.com",
//   projectId: "dormitoryautomation",
//   storageBucket: "dormitoryautomation.appspot.com",
//   messagingSenderId: "142514700559",
//   appId: "1:142514700559:web:9ba48319ce3a8b39ff7e7a"
// };
const firebaseConfig = {
    // apiKey: "AIzaSyBdFLgW27ZrWqP9ff3cNRJWQTLbW4VISYg",
    // authDomain: "firsttest-13a86.firebaseapp.com",
    // databaseURL: "https://firsttest-13a86-default-rtdb.firebaseio.com",
    // projectId: "firsttest-13a86",
    // storageBucket: "firsttest-13a86.appspot.com",
    // messagingSenderId: "965713799926",
    // appId: "1:965713799926:web:2f863245b29d2680d35ad7"

    apiKey: "AIzaSyBBpjV8U74xCaDO3vogX1Odw5IbcyvNCg4",
    authDomain: "dormitoryautomation.firebaseapp.com",
    projectId: "dormitoryautomation",
    storageBucket: "dormitoryautomation.appspot.com",
    messagingSenderId: "142514700559",
    appId: "1:142514700559:web:9ba48319ce3a8b39ff7e7a",
    measurementId: "G-HSLBL6FXWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DataBase = getFirestore(app);
export const RealtimeDB = getDatabase(app);
export const auth = getAuth(app);
export const Storage = getStorage(app);