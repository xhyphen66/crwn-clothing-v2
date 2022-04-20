import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';
 
const firebaseConfig = {
    apiKey: "AIzaSyDHY3WcPRXRJ46-4RYA_pC4XrlrFegrSrU",
    authDomain: "crown-ztm-db-642c9.firebaseapp.com",
    projectId: "crown-ztm-db-642c9",
    storageBucket: "crown-ztm-db-642c9.appspot.com",
    messagingSenderId: "952095705899",
    appId: "1:952095705899:web:1aa9eace5b1fdafeb0136e"
  };
  
const firebaseApp = initializeApp(firebaseConfig);
  
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// create a firestore database objext
export const db = getFirestore();

// create a document and save users data 
export const createUserDoc = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    // console.log(userSnapShot);
    // console.log(userSnapShot.exists());

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch (e) {
            console.log(e.message);
        }
    };

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};