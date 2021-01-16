import firebase from "firebase";

// the firebaseApp for the initialization of the firebase
const firebaseApp = firebase.initializeApp({
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
