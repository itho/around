import firebase from 'firebase'

// const config = {
//   apiKey: 'AIzaSyCrljfD23oTNrhSeEl0v1q5gNuurKWB5LU',
//   authDomain: 'around-me-app.firebaseapp.com',
//   databaseURL: 'https://around-me-app.firebaseio.com',
//   projectId: 'around-me-app',
//   storageBucket: 'around-me-app.appspot.com',
//   messagingSenderId: '1043835200298'
// }

// firebase.initializeApp(config)

export default {
  database: firebase.database(),
  storage: firebase.storage()
}
