import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBmle-v7pgrklNJ64wTfnfUa715jCE6kxg",
  authDomain: "instagram-clone-abede.firebaseapp.com",
  projectId: "instagram-clone-abede",
  storageBucket: "instagram-clone-abede.appspot.com",
  messagingSenderId: "494093462008",
  appId: "1:494093462008:web:f1e7a9ac7d9bdb498dce0d",
  measurementId: "${config.measurementId}",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
//storage is how we upload posts and send it to the db
const storage = firebase.storage();

export { db, auth, storage };
