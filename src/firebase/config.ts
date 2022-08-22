import firebase from "firebase/compat/app";

import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDLDldmxuPXN3MxYFO1qlyTzA9AGL4jP2g",
   authDomain: "chat-app-a37b7.firebaseapp.com",
   projectId: "chat-app-a37b7",
   storageBucket: "chat-app-a37b7.appspot.com",
   messagingSenderId: "395309912739",
   appId: "1:395309912739:web:eca0753871114c1f292516",
   measurementId: "G-SPF49Q47SH",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:9099");
if (location.hostname === "localhost") {
   db.useEmulator("localhost", 8080);
}
export { auth, db };
export default firebase;
