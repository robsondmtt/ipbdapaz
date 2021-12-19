import app, { functions, db } from '../../lib/firebase'
import { getFirestore, collection, updateDoc, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Center, List, ListItem } from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";
import Loading from "../../components/Loading";

const Perfil = () => {

    const [users, loading, error] = useCollection(
        collection(getFirestore(app), 'users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
    

    const criarAdministrador = ({email,uid}) => {
        const teste = httpsCallable(functions, 'addAdm')
        console.log(email,uid);
        
        teste({ email })
            .then(res => {
                console.log(res)
            })
            .then(() => {
            atualizarNivelAcessoAdm(uid)
        }
        ).catch(err => console.log(err.message))
        
    }
    const eliminarAdministrador = ({email,uid}) => {
        console.log('estou aqui');
        
        const teste2 = httpsCallable(functions, 'deleteAdm')
        teste2({ email })
            .then(res => {   
                console.log(res)
            })
            .then(() => {
                console.log('admin eliminado');
                
            atualizarNivelAcessoConvidado(uid)
        })
        
    }
    async function atualizarNivelAcessoAdm(uid) {
        
        await updateDoc(doc(db, "users", uid), {
            nivelPermissao: 'adm'
        }).then(() => {
            console.log('nivel acesso atualizado');
            
        })
    }
    async function atualizarNivelAcessoConvidado(uid) {
        
        await updateDoc(doc(db, "users", uid), {
            nivelPermissao: 'convidado'
        }).then(() => {
            console.log('nivel acesso atualizado');
            
        })
    }
   



return (
    <div>
        <div>
            
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <Loading />}
            {users && (

                <Center>
                    <List spacing={3}>


                        Collection:{' '}
                        {users.docs.map( item => (
                            <ListItem key={item.id} my="3">
                                {item.data().email},{' '}, {item.data().nivelPermissao}
                                <Button bg="green.300" onClick={() => criarAdministrador({email:item.data().email,uid:item.id})} >Criar Administrador</Button>
                                <Button bg="red.400" onClick={() => eliminarAdministrador({email:item.data().email,uid:item.id})} >Eliminar Administrador</Button>
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
