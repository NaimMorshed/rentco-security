import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBraFJvMbzflduEEd_gcndiOhA_r5iorns",
  authDomain: "rentaxo-web.firebaseapp.com",
  projectId: "rentaxo-web",
  storageBucket: "rentaxo-web.appspot.com",
  messagingSenderId: "836455377214",
  appId: "1:836455377214:web:42db297bebe567d737246f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, db, google, facebook, database, storage };