import { Box, Container, Flex, Heading, Spacer } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { getAuth } from "@firebase/auth";
import app from '../../lib/firebase'
import { FaGoogle } from 'react-icons/fa';
import { useAuthState } from "react-firebase-hooks/auth";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const [user] = useAuthState(getAuth(app));

    const { login, logout } = useAuth()

    return (
        <Box w="full" p={4} bg="green.600">
            <Container maxW='container.lg'  >

                <Flex>
                    <Box>
                        <Heading size='lg' color={'white'}>IPB</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                        {
                            user === null ?
                                <Button bg='white' onClick={login} leftIcon={<FaGoogle />}>Entrar</Button>
                                :
                                <>

                                    <Menu>
                                        <MenuButton >
                                            <Avatar
                                                size="md"
                                                name={user.displayName}
                                                src={user.photoURL} />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={logout}>Sair</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </>

                        }
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}

export default Navbar
