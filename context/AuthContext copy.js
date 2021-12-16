import app from '../lib/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from '@firebase/auth';
import { createContext, useState, useEffect } from 'react';

import Cookies from 'js-cookie'


export const AuthContext = createContext({});

function gerenciarCookie(logado) {
    if (logado) {
        Cookies.set('admin-template-cod3r-auth', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-cod3r-auth')
    }
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null)
    const [carregando, setCarregando] = useState(true)
    const [permissao, setPermissao] = useState(0)
    const [nivelAcesso, setNivelAcesso] = useState('convidado')

    async function configurarSessao(usuarioFirebase) {
        if (usuarioFirebase?.email) {
            setUser(usuarioFirebase)
            gerenciarCookie(true)
            setCarregando(false)

            return usuarioFirebase.email
        } else {
            setUser(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function login() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {

                const dados = result.user;
                await configurarSessao(dados)

                if (result) {
                    const db = getFirestore()
                    const query = doc(db, "users", result.user.uid);
                    const data = await getDoc(query);
    
                    setPermissao(data.data().permissao)
                }

                route.push('/')
                setCarregando(false)
            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            })
    }


    async function logout() {
        try {
            setCarregando(true)
            const auth = getAuth();
            await auth.signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }


    
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (userChange) => {
            if (userChange) {
                userChange.getIdTokenResult().then(idTokenResult => {
                    console.log(idTokenResult.claims)
                    if (!!idTokenResult.claims.admin) {
                        console.log('perfil administrador')
                        console.log(idTokenResult.claims.admin)
                        idTokenResult.claims.admin ? setNivelAcesso({ setNivelAcesso: 'admin'}) : setNivelAcesso({ setNivelAcesso: 'convidado'})
                        setNivelAcesso({ setNivelAcesso: 'admin'})
                    }
                })
            } 
          });
       

        if (Cookies.get('admin-template-cod3r-auth')) {
            const auth = getAuth();
            const cancelar = auth.onIdTokenChanged(configurarSessao)
            // setUser({

            // })

            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            user,
            permissao,
            carregando,
            login,
            logout,
            nivelAcesso,
            // recuperarSenha,
            // cadastrar,
            // // loginGoogle,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext