import { Box, Container, Flex, Heading, Spacer } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { Avatar } from "@chakra-ui/react"
import { getAuth } from "@firebase/auth";
import app from '../../lib/firebase'
import { FaGoogle } from 'react-icons/fa';
import { useAuthState } from "react-firebase-hooks/auth";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const [user] = useAuthState(getAuth(app));

    const { login } = useAuth()

    return (
        <Box w="full" p={4} bg="green.600">
            <Container maxW='container.lg'  >
                <Flex>
                    <Box><Heading as='h4' size='lg' color='white'>IPB</Heading></Box>
                    <Spacer />
                    <Box>
                        {
                            user === null ?
                                <>
                                
                                    <Button
                                        onClick={login}
                                        mx="4" leftIcon={<FaGoogle />}>
                                        Entrar
                                    </Button>

                                </>
                                :
                                <Avatar
                                    size="md"
                                    name={user.displayName}
                                    src={user.photoURL} />

                        }

                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}

export default Navbar
