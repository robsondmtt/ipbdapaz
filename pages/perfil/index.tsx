import { useEffect } from "react"
import app, { functions, db } from '../../lib/firebase'
import { getFirestore, collection, updateDoc, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Center, List, ListIcon, ListItem } from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";


const Perfil = () => {

    const [users, loading, error] = useCollection(
        collection(getFirestore(app), 'users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
    console.log(users);



    const outraFuncao = ({email,uid}) => {
        const teste = httpsCallable(functions, 'addAdm')
        teste({ email })
            .then(res => {
                console.log(res)
            })
            .then(() => {
            atualizarNivelAcesso(uid)
        })
        
    }
    async function atualizarNivelAcesso(uid) {
        console.log(uid);
        
        await updateDoc(doc(db, "users", uid), {
            nivelPermissao: 'admin'
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
                                <Button onClick={() => outraFuncao({email:doc.data().email,uid:doc.id})} >Administrador</Button>
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
