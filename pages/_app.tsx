import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'
import { useAuthState } from 'react-firebase-hooks/auth';
// import app from '../lib/firebase';
// import { getAuth } from '@firebase/auth';


function MyApp({ Component, pageProps }) {

  // const [user, loading, error] = useAuthState(getAuth(app));


  return  (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  ) 
}

export default MyApp