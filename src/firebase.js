import Firebase from 'firebase'
const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyBT42Eo24S-vaR0QXMOL7MhCbqOWSPg3a4',
  authDomain: 'vue-firebase-55aac.firebaseapp.com',
  databaseURL: 'https://vue-firebase-55aac.firebaseio.com',
  projectId: 'vue-firebase-55aac',
  storageBucket: 'vue-firebase-55aac.appspot.com',
  messagingSenderId: '356906720314'
})
export const db = firebaseApp.database()
