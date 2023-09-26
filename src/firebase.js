// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR70g5pRtVM_TYAKSSh6NQfATRNuI6Nmg",
  authDomain: "gaadibecho-23c25.firebaseapp.com",
  projectId: "gaadibecho-23c25",
  storageBucket: "gaadibecho-23c25.appspot.com",
  messagingSenderId: "616233835511",
  appId: "1:616233835511:web:cadea0b7e590e98b6a6cf2"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore(); 
