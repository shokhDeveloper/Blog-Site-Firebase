import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyC7YNkq0ikMK_q95OEW537q1g974FYK6qo",
  authDomain: "blog-site-firebase.firebaseapp.com",
  projectId: "blog-site-firebase",
  storageBucket: "blog-site-firebase.appspot.com",
  messagingSenderId: "757964918871",
  appId: "1:757964918871:web:bf42366520ca6648041312",
  measurementId: "G-6FCD9JEC7R"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()