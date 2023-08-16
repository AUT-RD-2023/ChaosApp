import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC8jIEEt1wxt4fD5PTEZue1fA34gHIDPRI",
    authDomain: "chaosapp-69e78.firebaseapp.com",
    databaseURL: "https://chaosapp-69e78-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chaosapp-69e78",
    storageBucket: "chaosapp-69e78.appspot.com",
    messagingSenderId: "582890466344",
    appId: "1:582890466344:web:26b853c0fcf5bbe041991d",
    measurementId: "G-CMB8L6BXT2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };