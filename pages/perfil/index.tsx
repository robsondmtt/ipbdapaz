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

    const toggleAdministrador = (nivel, email, uid) => {
        if (nivel === 'adm') {
            eliminarAdministrador({ email: email, uid: uid })
        } else {
            criarAdministrador({ email: email, uid: uid })
        }

    }
    const toggleConselho = (nivel, email, uid) => {
        if (nivel === 'conselho') {
            eliminarConselho({ email: email, uid: uid })
        } else {
            criarConselho({ email: email, uid: uid })
        }

    }




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
                                    <Box justifyContent="space-between">
                                        <Center>
                                           <strong> {doc.data().displayName}</strong>
                                        </Center>
                                        <Flex justifyContent="space-around" my="6">
                                            <Text mb='0'>
                                                Admin
                                            </Text>
                                            <Switch defaultChecked={
                                                doc.data().nivelPermissao === 'adm' ? true : false
                                            } id='email-alerts'
                                                onChange={
                                                    () => toggleAdministrador(
                                                        doc.data().nivelPermissao, doc.data().email, doc.id
                                                    )} />
                                            <Text mb='0'>
                                                Conselho
                                            </Text>
                                            <Switch defaultChecked={
                                                doc.data().nivelPermissao === 'conselho' ? true : false
                                            } id='email-alerts'
                                                onChange={
                                                    () => toggleConselho(
                                                        doc.data().nivelPermissao, doc.data().email, doc.id
                                                    )} />
                                            <Text mb='0'>
                                                Convidado
                                            </Text>
                                            <Switch defaultChecked={
                                                doc.data().nivelPermissao === 'convidado' ? true : false
                                            } id='email-alerts' isDisabled colorScheme="blue"
                                            />


                                        </Flex>
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
