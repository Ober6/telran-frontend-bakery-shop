// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD71-G8WLdrV4MuWGjknnesM0RnagL8-_c",
    authDomain: "bakery-shop-java-28-31.firebaseapp.com",
    projectId: "bakery-shop-java-28-31",
    storageBucket: "bakery-shop-java-28-31.firebasestorage.app",
    messagingSenderId: "532245998892",
    appId: "1:532245998892:web:b1a6222656772d16ad9089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)