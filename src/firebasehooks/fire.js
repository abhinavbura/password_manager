import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDNTnu0lzmTVPAh-uK9Y9ng8Xv0EuWSkb0",
  authDomain: "dobento-4bf74.firebaseapp.com",
  databaseURL: "https://dobento-4bf74-default-rtdb.firebaseio.com",
  projectId: "dobento-4bf74",
  storageBucket: "dobento-4bf74.appspot.com",
  messagingSenderId: "42373529678",
  appId: "1:42373529678:web:542197a84307ec026a831f",
  measurementId: "G-K2DEZ9PMG9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbref = firebase.database();
const storage = firebase.storage();
const auth = firebase.auth();

export { dbref, storage, auth };
