import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDMGJuXrqBXhTu3RElEUL8KGUYZFDbOdkI",
    authDomain: "granja-md.firebaseapp.com",
    databaseURL: "https://granja-md.firebaseio.com",
    projectId: "granja-md",
    storageBucket: "granja-md.appspot.com",
    messagingSenderId: "602327733540",
    appId: "1:602327733540:web:e5258556fb0cf178714fb1",
    measurementId: "G-H6DY4Q2BVC"
  };

  export default firebase.initializeApp(firebaseConfig);

