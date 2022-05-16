import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//GET Below Settings from Firebase > Project Overview > Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyCQNFWK3w3xtF3mAaQXCtuvB1PGKkVoA5E",
  authDomain: "sypher-dc301.firebaseapp.com",
  projectId: "sypher-dc301",
  storageBucket: "sypher-dc301.appspot.com",
  messagingSenderId: "821362713415",
  appId: "1:821362713415:web:095cbe7408be0c6fcd2262",
  measurementId: "G-74H3ZQ6WEE"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider}; 
  export default db;
