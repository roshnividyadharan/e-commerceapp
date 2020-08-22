import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD6cJRpf_97C9pq0PIl5ee3lDgqr2LsT3w",
    authDomain: "crwn-db-f2ea9.firebaseapp.com",
    databaseURL: "https://crwn-db-f2ea9.firebaseio.com",
    projectId: "crwn-db-f2ea9",
    storageBucket: "crwn-db-f2ea9.appspot.com",
    messagingSenderId: "812710576254",
    appId: "1:812710576254:web:34187bd3500ee250c5582f",
    measurementId: "G-WVY6WZF21W"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
