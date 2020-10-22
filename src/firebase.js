import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCbn3ZmJQm7ZCm3k5OpsMvEcRYAetuh138",
  authDomain: "whatsapp-clone-436ee.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-436ee.firebaseio.com",
  projectId: "whatsapp-clone-436ee",
  storageBucket: "whatsapp-clone-436ee.appspot.com",
  messagingSenderId: "347904928406",
  appId: "1:347904928406:web:db54c997b96f267b50f0b7",
  measurementId: "G-FD4WQGK10P",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
