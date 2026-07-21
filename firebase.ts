import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYaA-AA_-yAOlqIlTwW05YoPs5XwJCITo",
  authDomain: "jobshield-ai-2819d.firebaseapp.com",
  projectId: "jobshield-ai-2819d",
  storageBucket: "jobshield-ai-2819d.firebasestorage.app",
  messagingSenderId: "992991370652",
  appId: "1:992991370652:web:e5918b4f98678a6b027c59",
  measurementId: "G-LTLMC73X5C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);