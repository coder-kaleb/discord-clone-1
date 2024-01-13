import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBaq0EW2-BOe452m9AsOZgGtR-iFyY5m1Q",
  authDomain: "discord-db8b5.firebaseapp.com",
  projectId: "discord-db8b5",
  storageBucket: "discord-db8b5.appspot.com",
  messagingSenderId: "486959095001",
  appId: "1:486959095001:web:7dee4bc126b8795315f2c8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
