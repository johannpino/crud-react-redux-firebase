import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

const config = {
    apiKey: "You Key",
    authDomain: "crud-react-redux-firestore.firebaseapp.com",
    projectId: "crud-react-redux-firestore"
  };

  firebase.initializeApp(config)

  let db = firebase.firestore()
  db.settings({timestampsInSnapshots: true})

  export default db