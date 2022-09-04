// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBH7cZZkWGSj0-kZ4tn6g9UdON2VdZfbXc",
    authDomain: "whatsappclone-b16f0.firebaseapp.com",
    projectId: "whatsappclone-b16f0",
    storageBucket: "whatsappclone-b16f0.appspot.com",
    messagingSenderId: "794774864899",
    appId: "1:794774864899:web:c61ad175005c1e6db7ba36",
    measurementId: "G-TB9YXP0MS2"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  export {auth,provider}
  export default db;
  