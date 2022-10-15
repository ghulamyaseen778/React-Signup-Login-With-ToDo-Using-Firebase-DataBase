// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHDk17eQIPHVg-ZZ2UEJb68aR4aN4oOh4",
  authDomain: "react-login-singup-project.firebaseapp.com",
  projectId: "react-login-singup-project",
  storageBucket: "react-login-singup-project.appspot.com",
  messagingSenderId: "818586650209",
  appId: "1:818586650209:web:96e4453ac68dfdef744c20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db,auth}