import { auth, provider } from '../lib/firebase';
import { signInWithPopup } from '@firebase/auth';
import { Button } from "@chakra-ui/button"
import Image from 'next/image'

import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import LayoutCenter from '../components/Layout/LayoutCenter';
import { FaGoogle } from 'react-icons/fa';
const Login = ({ type, color }) => {
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
    }
    return (

        <LayoutCenter>
            <Center>
                <Flex direction="column" align="center" maxW="380px">
                    <Box>
                        <Image src={'/ipb.png'} alt='logo ipb' height="100" width="150" />
                    </Box>
                    <Box>
                        <Heading color="green.800">
                            IPB da Paz
                        </Heading>
                    </Box>
                    <Box mt="8" px="8">
                        <Center>
                            <Text as='cite' color="green.800" align='center'>
                                Todos pecaram e carecem da glória de Deus. <br />  Rm 3.23
                            </Text>
                        </Center>
                    </Box>
                    <Box>
                        <Button colorScheme='green' leftIcon={<FaGoogle />} my="8"
                            onClick={loginWithGoogle}>Entrar</Button>
                    </Box>
                </Flex>
            </Center>
        </LayoutCenter>


    )
}

export default Login
