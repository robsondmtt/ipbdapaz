
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from 'firebase/firestore';



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

// NEXT_APY_KEY=AIzaSyAFZin3V_Qju9Icinwwh5dkvIiiJEtxzZg
// NEXT_AUTH_DOMAIN=ipbdapaz-d4e3e.firebaseapp.com
// NEXT_PROJECT_ID=ipbdapaz-d4e3e
// NEXT_STORAGE_BUCKET=ipbdapaz-d4e3e.appspot.com
// NEXT_MESSAGING_SENDER_ID=912011983567
// NEXT_APP_ID=1:912011983567:web:a5361c7a843cc0f53355ba
// NEXT_MEASUREMENT_ID=${config.measurementId}



if (getApps().length) {
  app = getApp()
} else {
  app = initializeApp(firebaseConfig)
}

export default app

const functions = getFunctions()
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, functions, auth, provider };


export const criarAdministrador = ({email,uid}) => {
  const teste = httpsCallable(functions, 'addAdm')
  teste({ email })
      .then(res => {
          console.log(res)
      })
      .then(() => {
      atualizarNivelAcesso(uid,'adm')
  })
  
}
export const eliminarAdministrador = ({email,uid}) => {
  const teste2 = httpsCallable(functions, 'deleteAdm')
  teste2({ email })
      .then(res => {   
          console.log(res)
      })
      .then(() => {
          console.log('admin eliminado');
          
      atualizarNivelAcesso(uid,'convidado')
  })
  
}
async function atualizarNivelAcesso(uid,permissao) {
  
  await updateDoc(doc(db, "users", uid), {
      nivelPermissao: permissao
  }).then(() => {
      console.log('nivel acesso atualizado');
      
  })
}

