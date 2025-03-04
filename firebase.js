import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeeVQvd_UPq8hL3B3qiLI3TWbWn9CS3Fw",
  authDomain: "gifts-and-more-7aa78.firebaseapp.com",
  projectId: "gifts-and-more-7aa78",
  storageBucket: "gifts-and-more-7aa78.firebasestorage.app",
  messagingSenderId: "790311098682",
  appId: "1:790311098682:web:1be5be65e0526a706b9803",
  measurementId: "G-F7PQEE6RX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireStore = getFirestore(app);
// const giftsCollection = collection(fireStore, "gifts");
