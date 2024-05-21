import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR2q-yOu1mlklQmVeiKGKFVknzH6Lv5-c",
  authDomain: "ketchup-23b29.firebaseapp.com",
  projectId: "ketchup-23b29",
  storageBucket: "ketchup-23b29.appspot.com",
  messagingSenderId: "663969499096",
  appId: "1:663969499096:web:be2384a50dc1944f5d94ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);