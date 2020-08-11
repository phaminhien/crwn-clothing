import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDhE0i6Vb5Ram0hgZaHFfvFftb6wzq2W_4",
    authDomain: "crwn-clothing-2b2b8.firebaseapp.com",
    databaseURL: "https://crwn-clothing-2b2b8.firebaseio.com",
    projectId: "crwn-clothing-2b2b8",
    storageBucket: "crwn-clothing-2b2b8.appspot.com",
    messagingSenderId: "717515684813",
    appId: "1:717515684813:web:b3337f2370f4874b4b2284",
    measurementId: "G-GH15TJC4Y5"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;