// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDa-8_tLWkG22youTpSxB-Qp2APgTxufNc",
  authDomain: "codesprint-4a27a.firebaseapp.com",
  projectId: "codesprint-4a27a",
  storageBucket: "codesprint-4a27a.firebasestorage.app",
  messagingSenderId: "1036053029747",
  appId: "1:1036053029747:web:31173de14c157c418e9b06",
  measurementId: "G-PSFP2EJK5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;