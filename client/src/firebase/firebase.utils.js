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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

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
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

export const convertCollectionSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscibe = auth.onAuthStateChanged(userAuth => {
            unsubscibe();
            resolve(userAuth);
        }, reject);
    }); 
}

export default firebase;