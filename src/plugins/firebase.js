import firebase from "firebase/app";

import 'firebase/auth';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6WKUQsmIh76DVLjtCGT03_ruUohQwryM",
  authDomain: "mpv-wallet.firebaseapp.com",
  projectId: "mpv-wallet",
  storageBucket: "mpv-wallet.appspot.com",
  messagingSenderId: "692007051813",
  appId: "1:692007051813:web:c129945779ac8fffbd95cc",
  measurementId: "G-MNF3D2Q24N",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseStore = firebaseApp.firestore();

export const firebaseAuth = firebaseApp.auth();
export const usersCollection = firebaseStore.collection('users');
export const paymentsCollection = firebaseStore.collection('payments');

