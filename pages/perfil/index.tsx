import { useEffect, useState } from "react"
import { auth, criarAdministrador, criarConselho, eliminarAdministrador, eliminarConselho } from '../../lib/firebase'
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Center, List, Box, Switch } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import Navbar from "../../components/Nav/Navbar";
import LayoutContent from "../../components/Layout/LayoutContent";
// import { Box } from "@chakra-ui/react";


const Perfil = () => {


    const [users, loading, error] = useCollection(
        collection(getFirestore(), 'users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
    console.log(users);


    const user = auth.currentUser
    console.log(user.email);

    // const [switchAdm,setSwitchAdm] = useState(false)

    return (
        <>
            <Navbar />
            <LayoutContent>

                {/* {user && user.email} */}
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <Loading />}
                {user.email !== 'robson.dev9@gmail.com' && 'A página pode ser visualizada apenas pelo administrador do sistema'}
                {users && user.email === 'robson.dev9@gmail.com' && (

                    <Center>
                        <List spacing={3}>


                            Collection:{' '}
                            {users.docs.map((doc) => (
                                <Box key={doc.id} bg="gray.100" borderRadius="lg" my="4" p="4">
                                    <Center>
                                        {doc.data().email}
                                    </Center>
                                    <Center>
                                        {doc.data().nivelPermissao}
                                    </Center>
                                    <Center mb="2">
                                        {/* <Switch defaultChecked={switchAdm} onchange={setSwitchAdm} colorScheme='red' /> */}
                                        <Button bg="green.300" mr="1" onClick={() => criarAdministrador({ email: doc.data().email, uid: doc.id })} >Criar Administrador</Button>
                                        <Button bg="red.400" ml="1" onClick={() => eliminarAdministrador({ email: doc.data().email, uid: doc.id })} >Eliminar Administrador</Button>
                                    </Center>
                                    <Center mb="2">
                                        <Button bg="green.300" mr="1" onClick={() => criarConselho({ email: doc.data().email, uid: doc.id })} >Criar Conselho</Button>
                                        <Button bg="red.400" ml="1" onClick={() => eliminarConselho({ email: doc.data().email, uid: doc.id })} >Eliminar Conselho</Button>
                                    </Center>

                                </Box>

                            ))}
                        </List>
                    </Center>
                )}
            </LayoutContent>
        </>
    )
}

export default Perfil
