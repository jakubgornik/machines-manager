// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration apikey for email/passwrod credentials
const firebaseConfig = {
  apiKey: "AIzaSyCk2D1SnZd9z7etXKCR6_0xNCyHBX_gMA8",
  authDomain: "machinesv2.firebaseapp.com",
  projectId: "machinesv2",
  storageBucket: "machinesv2.appspot.com",
  messagingSenderId: "1050857033957",
  appId: "1:1050857033957:web:1f627034309425d7a1c40c",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const db = getFirestore();
const auth = getAuth();

// { app, db, auth }
export { app, auth };
