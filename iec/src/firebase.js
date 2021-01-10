import firebase from "firebase";

// the firebaseApp for the initialization of the firebase
const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyDdeFoYKvlcEWfdzifzo6ejdJmD8VCxANA",
    authDomain: "contactless-payments-b6ea7.firebaseapp.com",
    projectId: "contactless-payments-b6ea7",
    storageBucket: "contactless-payments-b6ea7.appspot.com",
    messagingSenderId: "1078152858804",
    appId: "1:1078152858804:web:4d518bfbeb8f63aae71be1",
    measurementId: "G-HCCWYXMV1B"

});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };