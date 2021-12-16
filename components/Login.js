import { auth, provider } from '../lib/firebase';
import { signInWithPopup } from '@firebase/auth';
import { Button, Center } from '@chakra-ui/react';
import LayoutCenter from './Layout/LayoutCenter';
const Login = ({ type, color }) => {
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
    }
    return (

        <LayoutCenter>
            <Center>
                <Button colorScheme='teal' 
                onClick={loginWithGoogle}
            >Sign in Google</Button>
            </Center>
        </LayoutCenter>


    )
}

export default Login
