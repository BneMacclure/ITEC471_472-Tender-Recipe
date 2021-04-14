import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDeCWlbM7NNorXrl1oOnjVSwwS2n8hcq9s",
    authDomain: "tenderrecipe.firebaseapp.com",
    databaseURL: "https://tenderrecipe-default-rtdb.firebaseio.com",
    projectId: "tenderrecipe",
    storageBucket: "tenderrecipe.appspot.com",
    messagingSenderId: "676253799900",
    appId: "1:676253799900:web:10622e66267c76f5e22b19"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

export {firebaseApp, db}