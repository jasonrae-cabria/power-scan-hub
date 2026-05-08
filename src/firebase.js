import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlKbKhoB_rtu_V6GXlnVuf8MoD8mzQQzk",
  authDomain: "power-scan-hub.firebaseapp.com",
  projectId: "power-scan-hub",
  storageBucket: "power-scan-hub.firebasestorage.app",
  messagingSenderId: "875285993631",
  appId: "1:875285993631:web:33db59d8827e39fc946aaa"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);