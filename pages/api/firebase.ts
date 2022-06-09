// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import 'firebase/analytics'

// Add the Firebase products that you want to use
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// import 'firebase/database'
// import 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzYDv8HlH72O1uzKgwi7UkZ6J9KW1KVZ4",
  authDomain: "iexporter-essence.firebaseapp.com",
  databaseURL: "https://iexporter-essence-default-rtdb.firebaseio.com",
  projectId: "iexporter-essence",
  storageBucket: "iexporter-essence.appspot.com",
  messagingSenderId: "818818492620",
  appId: "1:818818492620:web:d4915a92fd939f48783a69",
  measurementId: "G-GXLDNF2HBB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);

