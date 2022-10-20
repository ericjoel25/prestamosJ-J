import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBDQNmkhZ1rg-G3Aeaa3dfkMJFEBj1U-oU",
    authDomain: "prestamos-jj.firebaseapp.com",
    databaseURL: "https://prestamos-jj-default-rtdb.firebaseio.com",
    projectId: "prestamos-jj",
    storageBucket: "prestamos-jj.appspot.com",
    messagingSenderId: "496989944627",
    appId: "1:496989944627:web:fd1e19cf6fc6f7ae215c46"
  
  };

  export default firebase.initializeApp(firebaseConfig);

