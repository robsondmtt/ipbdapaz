import { Button } from '@chakra-ui/button'
import { Box, Center, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LayoutCenter from '../components/Layout/LayoutCenter'
import Navbar from '../components/Nav/Navbar'
import useAuth from '../hooks/useAuth'



export default function Home() {

  // const {user,permissao} = useAuth()

  // console.log(user);
  
  return (

    <>
      <Navbar />
      {/* <LayoutCenter> */}
      <Container maxW='container.xl'>

        <SimpleGrid mt={8} columns={[1, 2, 3]} spacing='20px'>
          <Link href={"/perfil"} passHref>
            <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%">Perfil</Center>
            </Box>
          </Link>
          <Link href={"/financeiro"} passHref>
            <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%">Financeiro</Center>
            </Box>
          </Link>
          <Link href={"/programacoes"} passHref>
            <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%">Programações</Center>
            </Box>
          </Link>
          <Link href={"/conselho"} passHref>
            <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%">Conselho</Center>
            </Box>
          </Link>
          <Link href={"/sermoes"} passHref>
            <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%">Sermões</Center>
            </Box>
          </Link>
          <Link href={"/boletim"} passHref>
            <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%">Boletim</Center>
            </Box>
          </Link>
          <Link href={"/pedidos-oracao"} passHref>
            <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%">Pedidos de Oração</Center>
            </Box>
          </Link>
          <Link href={"/pedidos-visita"} passHref>
            <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%">Pedidos de Visita</Center>
            </Box>
          </Link>
        </SimpleGrid>
      </Container>
      {/* </LayoutCenter> */}
    </>
  )
}

