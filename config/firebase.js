import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCBXnvA7BRg3_eog2_SeyTvRToURXZ89MQ",
  authDomain: "scandinavia-a7d93.firebaseapp.com",
  projectId: "scandinavia-a7d93",
  storageBucket: "scandinavia-a7d93.appspot.com",
  messagingSenderId: "753683146365",
  appId: "1:753683146365:web:e83f70d8b1091afd1af314"
};
  

/* initialize firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore()

export { auth, database };

