import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB4IM-vcFjSMUsydGKUwtNVuyNNiEFKWQg",
  authDomain: "board-7a622.firebaseapp.com",
  databaseURL:
    "https://board-7a622-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "board-7a622",
  storageBucket: "board-7a622.appspot.com",
  messagingSenderId: "125692031572",
  appId: "1:125692031572:web:94dad0dec0c61d958973c1",
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export { ref, set, get, child };
