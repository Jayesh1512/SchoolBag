import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyChyWnOcX4ocbPZG3zyJ7vlZtQvzSQseRE",
  authDomain: "note-a-700f0.firebaseapp.com",
  projectId: "note-a-700f0",
  storageBucket: "note-a-700f0.appspot.com",
  messagingSenderId: "647353203979",
  appId: "1:647353203979:web:fd636dfec9db9c509f360e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword };