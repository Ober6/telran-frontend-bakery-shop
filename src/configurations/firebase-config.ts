// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqCN44qxpdKHLDcQeeW87BL9ccXqJvHyA",
    authDomain: "bakery-shop-ca394.firebaseapp.com",
    projectId: "bakery-shop-ca394",
    storageBucket: "bakery-shop-ca394.firebasestorage.app",
    messagingSenderId: "735420430494",
    appId: "1:735420430494:web:c7040ca7069feb6823638f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)