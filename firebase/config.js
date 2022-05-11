import firebase from "firebase/compat/app";
import { GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/database";

export const firebaseConfig = {
    apiKey: "AIzaSyB1flni14Y-dUnykG6NDck2_Yln69pTF8E",
    authDomain: "fir-5abc2.firebaseapp.com",
    databaseURL:
        "https://fir-5abc2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-5abc2",
    storageBucket: "fir-5abc2.appspot.com",
    messagingSenderId: "44538382106",
    appId: "1:44538382106:web:d487f281ca9e09971d4ea3",
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const provider = new GoogleAuthProvider();

const auth = app.auth();

const database = app.database();

export { auth, database, provider };
