import app from '../lib/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from '@firebase/auth';
import { createContext, useState, useEffect, useContext } from 'react';

import Loading from '../components/Loading'
import Login from '../pages/Login'

import Cookies from 'js-cookie'


export const AuthContext = createContext({
    user: null,
    currentUser: null,
    permissao: null

});

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
    const [permissao, setPermissao] = useState(null)

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

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

                    setPermissao(data.data().nivelPermissao)
                }

                route.push('/')
                setCarregando(false)
            }).catch((error) => {
                console.log(error);
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
        const auth = getAuth()
        auth.onIdTokenChanged(async (user) => {
            if (!user) {
                console.log('no user');
                setCurrentUser(null);
                setLoading(false)
                return;
            }
            setCurrentUser(user);
            setLoading(false)

            // set custom claims 
            user.getIdTokenResult().then(idTokenResult => {
                if (idTokenResult.claims.admin) {
                    setPermissao('admin');
                    console.log(idTokenResult.claims.admin);
                }
                
                else if(idTokenResult.claims.conselho){
                    setPermissao('conselho');
                    console.log(idTokenResult.claims.admin);
                }
                else{
                    setPermissao('convidado');
                    console.log(idTokenResult.claims.admin);
                }

            })

        })
    }, [permissao])

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (userChange) => {
            if (userChange) {
                userChange.getIdTokenResult().then(idTokenResult => {

                    // set custom claims 
                    if (idTokenResult.claims.admin) {
                        setPermissao('admin')
                        console.log(permissao)
                    }
                    else if(idTokenResult.claims.conselho){
                        setPermissao('conselho')
                        console.log(permissao)
                    }else{
                        setPermissao('convidado')
                        console.log(permissao)

                    }
                })
            }
            
        });



    }, [permissao])


    if (loading) {
        return <Loading type="bubbles" color="yellowgreen" />;

    }
    if (!currentUser) {
        return <Login />
    } else {
        return (
            <AuthContext.Provider value={{
                user,
                currentUser,
                loading,
                permissao,
                carregando,
                login,
                logout,
                // recuperarSenha,
                // cadastrar,
                // // loginGoogle,
            }}>
                {props.children}
            </AuthContext.Provider>
        )
    }
}


export default AuthContext