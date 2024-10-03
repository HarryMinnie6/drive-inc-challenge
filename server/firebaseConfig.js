
const { initializeApp } = require('firebase/app')
const { getFirestore } = require("firebase/firestore")
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_CONFIG_APP_ID
};

let app;
let fireStoreDb;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        fireStoreDb = getFirestore(app);
    } catch (error) {
        console.log("Error initializing Firebase:", error);
    }
};

const getFirebaseApp = () => app;
const getFirestoreDb = () => fireStoreDb;

initializeFirebaseApp();

module.exports = {
    getFirebaseApp,
    getFirestoreDb
};  