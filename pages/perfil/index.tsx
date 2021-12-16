import { useEffect } from "react"
import app, { functions, db } from '../../lib/firebase'
import { getFirestore, collection, updateDoc, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Center, List, ListIcon, ListItem } from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";
import useAuth from "../../hooks/useAuth";


const Perfil = () => {

    const [users, loading, error] = useCollection(
        collection(getFirestore(app), 'users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
    console.log(users);



    const criarAdministrador = ({email,uid}) => {
        const teste = httpsCallable(functions, 'addAdm')
        teste({ email })
            .then(res => {
                console.log(res)
            })
            .then(() => {
            atualizarNivelAcesso(uid,'adm')
        })
        
    }
    const eliminarAdministrador = ({email,uid}) => {
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
   



return (
    <div>
        <div>
            
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {users && (

                <Center>
                    <List spacing={3}>


                        Collection:{' '}
                        {users.docs.map((doc) => (
                            <ListItem key={doc.id} my="3">
                                {doc.data().email},{' '}, {doc.data().nivelPermissao}
                                <Button bg="green.300" onClick={() => criarAdministrador({email:doc.data().email,uid:doc.id})} >Criar Administrador</Button>
                                <Button bg="red.400" onClick={() => eliminarAdministrador({email:doc.data().email,uid:doc.id})} >Eliminar Administrador</Button>
                            </ListItem>
                        ))}
                    </List>
                </Center>
            )}
        </div>
    </div>
)
}

export default Perfil
