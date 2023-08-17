// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfbofRrKQxeeGmDjWl_e_0kZ4qHvC1TFo",
    authDomain: "my-todo-7ae7b.firebaseapp.com",
    projectId: "my-todo-7ae7b",
    storageBucket: "my-todo-7ae7b.appspot.com",
    messagingSenderId: "294024902395",
    appId: "1:294024902395:web:e29537452fbd700db4225e",
    measurementId: "G-B4W5R0GC4C"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }