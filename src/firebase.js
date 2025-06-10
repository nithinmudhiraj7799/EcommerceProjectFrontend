// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBjcRVXGEddgNU-CXfOgprtdW8w7kRyCU",
  authDomain: "ecommerce-n-f29b7.firebaseapp.com",
  projectId: "ecommerce-n-f29b7",
  storageBucket: "ecommerce-n-f29b7.appspot.com", // fixed here
  messagingSenderId: "75070363788",
  appId: "1:75070363788:web:06cb012746c102c85b83a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
