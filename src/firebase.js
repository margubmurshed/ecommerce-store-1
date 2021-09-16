import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBp1F8MgyhLbEaazZiZPqeK5X-dZasLYR8",
    authDomain: "margub-webshop.firebaseapp.com",
    projectId: "margub-webshop",
    storageBucket: "margub-webshop.appspot.com",
    messagingSenderId: "114059764871",
    appId: "1:114059764871:web:c7bf9779a72aad2a828422",
    measurementId: "G-97CQ3DZ18P"
  };

export const FirebaseINIT = firebase.initializeApp(firebaseConfig);
export const FirebaseAuth = FirebaseINIT.auth();
export const FireStore = FirebaseINIT.firestore();
export const GoogleAuthProviderInstance = new firebase.auth.GoogleAuthProvider();