import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1INoqnD6qwUqF2DhyvylDecgrV3pcfZ4",
  authDomain: "khanasubkliyeksl.firebaseapp.com",
  projectId: "khanasubkliyeksl",
  storageBucket: "khanasubkliyeksl.appspot.com",
  messagingSenderId: "213493683561",
  appId: "1:213493683561:web:7d1cb287f795d2402619f8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


// const auth = firebase.auth();
// const db = firebase.firestore();

export { app, createUserWithEmailAndPassword, auth, signInWithEmailAndPassword, db, doc, setDoc, onAuthStateChanged, getDoc, updateDoc, signOut };