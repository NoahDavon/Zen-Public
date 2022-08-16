import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyDlq85Uk6nH994MRD1AFPNkJQbzU56KgQM",

    authDomain: "zenspecialtycoffee-d42a6.firebaseapp.com",
  
    projectId: "zenspecialtycoffee-d42a6",
  
    storageBucket: "zenspecialtycoffee-d42a6.appspot.com",
  
    messagingSenderId: "546719735274",
  
    appId: "1:546719735274:web:5c300ed919dabd5d352693",
  
    measurementId: "G-HGTNXR19BQ"  
  };
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
