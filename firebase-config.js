imimport { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmyWKPTd67VaJnGP1Yo_KlnloQ00hUkiU",
  authDomain: "bolsoapp-fb89e.firebaseapp.com",
  projectId: "bolsoapp-fb89e",
  storageBucket: "bolsoapp-fb89e.firebasestorage.app",
  messagingSenderId: "1064352456646",
  appId: "1:1064352456646:web:e527d378d042af81795cc7",
  measurementId: "G-LR9NJ127MN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
