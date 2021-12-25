import { useCallback, useEffect, useState } from "react"
import { auth, criarAdministrador, criarConselho, eliminarAdministrador, eliminarConselho } from '../../lib/firebase'
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Center, List, Box, Switch, Flex, Text, Image, Badge } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import Navbar from "../../components/Nav/Navbar";
import LayoutContent from "../../components/Layout/LayoutContent";

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

    const [carregando, setCarregando] = useState(false)
    const toggleAdministrador = (nivel, email, uid) => {
        setCarregando(true)
        if (nivel === 'adm') {
            eliminarAdministrador({ email: email, uid: uid })
            setCarregando(false)
        } else {
            criarAdministrador({ email: email, uid: uid })
            setCarregando(false)
        }

    }
    const toggleConselho = (nivel, email, uid) => {
        setCarregando(true)
        if (nivel === 'conselho') {
            eliminarConselho({ email: email, uid: uid })
            setCarregando(false)
        } else {
            criarConselho({ email: email, uid: uid })
            setCarregando(false)
        }
    }




    return (
        <>
            <Navbar />
            <LayoutContent>

                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <Loading />}
                {user.email !== 'robson.dev9@gmail.com' && 'A página pode ser visualizada apenas pelo administrador do sistema'}
                {users && user.email === 'robson.dev9@gmail.com' && (

                    <Center>
                        <List spacing={3}>


                            Collection:{' '}
                            {users.docs.map((doc) => (

                                <Box key={doc.id} bg="gray.100" borderRadius="lg" my="4" p="4">
                                    <Box justifyContent="space-between">
                                        <Center>
                                            <strong> {doc.data().displayName}</strong>
                                        </Center>

                                        <Box justifyContent="space-around" my="6">
                                            <Flex justifyContent="space-between">
                                                <Text>
                                                    Admin
                                                </Text>
                                                <Switch defaultChecked={
                                                    doc.data().nivelPermissao === 'adm' ? true : false
                                                } id='email-alerts'
                                                    onChange={
                                                        () => toggleAdministrador(
                                                            doc.data().nivelPermissao, doc.data().email, doc.id
                                                        )} />
                                            </Flex>
                                            <Flex justifyContent="space-between">
                                                <Text>
                                                    Conselho
                                                </Text>
                                                <Switch defaultChecked={
                                                    doc.data().nivelPermissao === 'conselho' ? true : false
                                                } id='email-alerts'
                                                    onChange={
                                                        () => toggleConselho(
                                                            doc.data().nivelPermissao, doc.data().email, doc.id
                                                        )} />
                                            </Flex>
                                            <Flex justifyContent="space-between">
                                                <Text>
                                                    Convidado
                                                </Text>
                                                <Switch defaultChecked={
                                                    doc.data().nivelPermissao === 'convidado' ? true : false
                                                } id='email-alerts' isDisabled colorScheme="blue"
                                                />
                                            </Flex>


                                        </Box>
                                    </Box>




                                    <Center>
                                        <Badge p="2" variant='outline' colorScheme='green'>
                                            <strong> {doc.data().nivelPermissao}</strong>
                                        </Badge>
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
