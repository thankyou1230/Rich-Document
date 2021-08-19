import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBSehZ4HCztz6LW78DN6RmKjcFzLFcoxoY",
  authDomain: "rich-document.firebaseapp.com",
  databaseURL: "https://rich-document-default-rtdb.firebaseio.com",
  projectId: "rich-document",
  storageBucket: "rich-document.appspot.com",
  messagingSenderId: "1065943739458",
  appId: "1:1065943739458:web:20c70c32210e06e11291db",
  measurementId: "G-P63EV9EF9L",
});

export default firebaseConfig;

