import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// console.log(FIREBASE_API)

const firebaseConfig = {
  apiKey: "AIzaSyC5QnZ-hScJH5FJlEUCQEri7xmGHEqX02k",
  authDomain: "videonest-1d435.firebaseapp.com",
  projectId: "videonest-1d435",
  storageBucket: "videonest-1d435.appspot.com",
  messagingSenderId: "258630176301",
  appId: "1:258630176301:web:7bce63472b698b586bf2a4"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;