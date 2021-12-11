
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'
import { GoogleAuthProvider } from "firebase/auth";



let app: FirebaseApp;

const firebaseConfig = {
  apiKey: "AIzaSyAFZin3V_Qju9Icinwwh5dkvIiiJEtxzZg",
  authDomain: "ipbdapaz-d4e3e.firebaseapp.com",
  projectId: "ipbdapaz-d4e3e",
  storageBucket: "ipbdapaz-d4e3e.appspot.com",
  messagingSenderId: "912011983567",
  appId: "1:912011983567:web:a5361c7a843cc0f53355ba",
  measurementId: "${config.measurementId}"
};



if (getApps().length) {
  app = getApp()
} else {
  app = initializeApp(firebaseConfig)
}

export default app


