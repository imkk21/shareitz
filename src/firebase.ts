import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDDgyXnbF1yy_cSBm9LH6XjqmsJtoJHW84",
  authDomain: "shareitz-63c1d.firebaseapp.com",
  databaseURL: "https://shareitz-63c1d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shareitz-63c1d",
  storageBucket: "shareitz-63c1d.firebasestorage.app",
  messagingSenderId: "332706738685",
  appId: "1:332706738685:web:f4a9fd688bb571ad53e994",
  measurementId: "G-VN3SXV4C6Q",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };