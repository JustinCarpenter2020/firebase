import firebase from 'firebase/app'
require('firebase/storage')

// NOTE you get this when you create a new app in firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB-A-563WGlQV67ZwtANqwSpnIbz3VEZ_Y',
  authDomain: 'storage-a3abe.firebaseapp.com',
  projectId: 'storage-a3abe',
  storageBucket: 'storage-a3abe.appspot.com',
  messagingSenderId: '52852852088',
  appId: '1:52852852088:web:d657a8141e7521e344b48d',
  measurementId: 'G-HKRZP0P3G0'
}

firebase.initializeApp(firebaseConfig)
export const storage = firebase.storage()
