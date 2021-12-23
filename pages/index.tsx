import { Button } from '@chakra-ui/button'
import { Box, Center, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LayoutCenter from '../components/Layout/LayoutContent'
import MenuInicial from '../components/Layout/MenuInicial'
import Navbar from '../components/Nav/Navbar'
import useAuth from '../hooks/useAuth'

// import { Icon } from '@chakra-ui/react'
// import { FaCalendar } from 'react-icons/fa'



export default function Home() {


  const { permissao } = useAuth()

  return (

    <>
      <Navbar />
      {/* <LayoutCenter> */}
      <Container maxW='container.xl'>

        <SimpleGrid my={8} columns={[1, 2, 3]} spacing='20px'>
          {permissao === 'admin' && <MenuInicial link="/perfil" name="Perfil" />}
          <MenuInicial link="/financeiro" 
            // icone={<Icon as={FaCalendar} />} 
            name="Financeiro" />
          <MenuInicial link="/programacoes" name="Programações" />
          <MenuInicial link="/conselho" name="Conselho" />
          <MenuInicial link="/sermoes" name="Sermões" />
          <MenuInicial link="/boletim" name="Boletim" />
          <MenuInicial link="/pedidos-oracao" name="Pedidos de Oração" />
          <MenuInicial link="/pedidos-visita" name="Pedidos de Visita" />
          {permissao === 'conselho' || permissao === 'admin' && <MenuInicial link="/tesouraria" name="Tesouraria" />}
        </SimpleGrid>
      </Container>
      {/* </LayoutCenter> */}
    </>
  )
}

