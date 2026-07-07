import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLTGelptU4033VebQRxDvV76pWphuADdE",
  authDomain: "beutifulnursery.firebaseapp.com",
  projectId: "beutifulnursery",
  storageBucket: "beutifulnursery.firebasestorage.app",
  messagingSenderId: "514962148250",
  appId: "1:514962148250:web:e4be81b54178b02c784823"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

