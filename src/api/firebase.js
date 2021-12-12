import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTn9bCs6RiWh0EEM4iZ0hIzQjJDjUQwso",
  authDomain: "food-search-2ae53.firebaseapp.com",
  projectId: "food-search-2ae53",
  storageBucket: "food-search-2ae53.appspot.com",
  messagingSenderId: "224701272709",
  appId: "1:224701272709:web:0bf6015b143bade4bbcfec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const firebase = { app, auth, db };

export default firebase;
