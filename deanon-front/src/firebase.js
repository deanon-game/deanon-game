import Firebase from 'firebase'
// eslint-disable-next-line no-unused-vars
import Firestore from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDCOmnYpsURAe2wHP9lYsX_YXSRUd_FPzA',
  authDomain: 'who-is-here-game.firebaseapp.com',
  databaseURL: 'https://who-is-here-game.firebaseio.com',
  projectId: 'who-is-here-game',
  storageBucket: 'who-is-here-game.appspot.com',
  messagingSenderId: '493461329667',
  appId: '1:493461329667:web:1d6eb6bf5fdb7a9f'
}

Firebase.initializeApp(config)

const fireStore = Firebase.firestore()

export default fireStore
