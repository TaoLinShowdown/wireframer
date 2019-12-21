import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDVDYj51P697YxT2hLjVC3DCWTWtC-2Yls",
    authDomain: "wireframer-6ddb6.firebaseapp.com",
    databaseURL: "https://wireframer-6ddb6.firebaseio.com",
    projectId: "wireframer-6ddb6",
    storageBucket: "wireframer-6ddb6.appspot.com",
    messagingSenderId: "403910743751",
    appId: "1:403910743751:web:5e285e9dd4cf50a595d0e2",
    measurementId: "G-X5J4J0ZT2Z"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;