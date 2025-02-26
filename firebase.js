// Firebase SDK
const firebaseConfig = {
    apiKey: "AIzaSyAbH67CgYGYJv4FXrtWYKiWA8ACTXK5shE",
    authDomain: "pol-me.firebaseapp.com",
    databaseURL: "https://pol-me-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pol-me",
    storageBucket: "pol-me.firebasestorage.app",
    messagingSenderId: "447211103879",
    appId: "1:447211103879:web:2a9362f2470a10663aba22"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();