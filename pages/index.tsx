import { Button } from '@chakra-ui/button'
import { Box, Center, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LayoutCenter from '../components/Layout/LayoutContent'
import MenuInicial from '../components/Layout/MenuInicial'
import Loading from '../components/Loading'
import Navbar from '../components/Nav/Navbar'
import useAuth from '../hooks/useAuth'

// import { Icon } from '@chakra-ui/react'
// import { FaCalendar } from 'react-icons/fa'



export default function Home() {


  const { permissao, currentUser } = useAuth()
  
  return currentUser ? (

    <>
      <Navbar />
      {/* <LayoutCenter> */}
      <Container maxW='container.xl'>

        <SimpleGrid my={8} columns={[ 2, 3]} spacing='20px'>
          {permissao === 'admin' && currentUser.email === 'robson.dev9@gmail.com' && <MenuInicial link="/perfil" icone="/icones/perfil.png" name="Perfil" />}
          <MenuInicial link="/programacoes" icone="/icones/agenda.png" name="Programações" />
          <MenuInicial link="/conselho" icone="/icones/encontro.png" name="Conselho" />
          <MenuInicial link="/sermoes" icone="/icones/sermao.png" name="Sermões" />
          <MenuInicial link="/boletim" icone="/icones/boletim.png" name="Boletim" />
          <MenuInicial link="/aconselhamentos" icone="/icones/visita.png" name="Aconselhamentos" />
          <MenuInicial link="/pedidos-oracao" icone="/icones/oracao.png" name="Pedidos de Oração" />
          {permissao === 'conselho'  && 
          <MenuInicial link="/tesouraria" icone="/icones/bau.png" name="Tesouraria" />}
        </SimpleGrid>
      </Container>
      {/* </LayoutCenter> */}
    </>
  ) : <Loading />
}

