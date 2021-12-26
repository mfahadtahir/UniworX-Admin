// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDz1guNKxgsJ1M_brXcqpdHwCr1U8fWIqQ',
  authDomain: 'uniworx-admin.firebaseapp.com',
  projectId: 'uniworx-admin',
  storageBucket: 'uniworx-admin.appspot.com',
  messagingSenderId: '964648179462',
  appId: '1:964648179462:web:8b00821ac4cb520923b087'
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
