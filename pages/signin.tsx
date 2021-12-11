import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Center, Heading } from "@chakra-ui/layout"
import { useState } from "react"
import LayoutCenter from "../components/Layout/LayoutCenter"

const SignIn = () => {

    const [modo,setModo] = useState('login')
    return (
        <>
            <LayoutCenter>
                <Box minW="lg" borderWidth='1px' borderRadius='lg' p={4}>
                    <Center>
                        <Heading my={8}>Sistema</Heading>
                    </Center>
                    <FormControl id='email'>
                        <FormLabel px="2">Email:</FormLabel>
                        <Input type='email' />
                    </FormControl>

                    <FormControl id='password' my={6}>
                        <FormLabel px="2">Senha:</FormLabel>
                        <Input type='password' />
                    </FormControl>

                    <Button align="right" colorScheme="teal">
                        {modo === 'login' ? 'Acessar' : 'Cadastrar'}
                    </Button>
                    <Center my={4}>
                        <p>Esqueci a senha</p>
                    </Center>
                    <Center my={4}>
                        {modo === 'login' ? (
                            <p>Não tenho conta... <a onClick={() => setModo('cadastrar')}>Cadastre-se</a></p>
                            ): (
                            <p>Já tenho conta... <a onClick={() => setModo('login')}>Entrar</a></p>

                        )}
                    </Center>
                </Box>
            </LayoutCenter>
        </>
    )
}

export default SignIn
