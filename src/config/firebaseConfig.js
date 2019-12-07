import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAmM_7wj_hAI4wUBgfcQVB2b3bIspWRRZo",
    authDomain: "wireframer-taolin.firebaseapp.com",
    databaseURL: "https://wireframer-taolin.firebaseio.com",
    projectId: "wireframer-taolin",
    storageBucket: "wireframer-taolin.appspot.com",
    messagingSenderId: "908588370361",
    appId: "1:908588370361:web:9f3119b3dc5f317290ce68",
    measurementId: "G-9KVCJ27Z3D"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;