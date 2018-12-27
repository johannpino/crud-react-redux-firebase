import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

const config = {
    apiKey: "AIzaSyBzameSRDDI5THhm6XU-o9VeN2SI7H-Uxg",
    authDomain: "crud-react-redux-firestore.firebaseapp.com",
    projectId: "crud-react-redux-firestore"
  };

  firebase.initializeApp(config)

  let db = firebase.firestore()
  db.settings({timestampsInSnapshots: true})

  export default db