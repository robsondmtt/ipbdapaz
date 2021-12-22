import { Button } from '@chakra-ui/button'
import { Box, Center, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LayoutCenter from '../components/Layout/LayoutContent'
import MenuInicial from '../components/Layout/MenuInicial'
import Navbar from '../components/Nav/Navbar'
import useAuth from '../hooks/useAuth'



export default function Home() {

  
  const {nivelAcesso} = useAuth()
  
  return (

    <>
      <Navbar />
      {/* <LayoutCenter> */}
      <Container maxW='container.xl'>

        <SimpleGrid mt={8} columns={[1, 2, 3]} spacing='20px'>
          {nivelAcesso === 'admin' && <MenuInicial link="/perfil" name="Perfil" />}
          <MenuInicial link="/financeiro" name="Financeiro" />
          <MenuInicial link="/programacoes" name="Programações" />
          <MenuInicial link="/conselho" name="Conselho" />
          <MenuInicial link="/sermoes" name="Sermões" />
          <MenuInicial link="/boletim" name="Boletim" />
          <MenuInicial link="/pedidos-oracao" name="Pedidos de Oração" />
          <MenuInicial link="/pedidos-visita" name="Pedidos de Visita" />
          <MenuInicial link="/tesouraria" name="Tesouraria" />
          
        </SimpleGrid>
      </Container>
      {/* </LayoutCenter> */}
    </>
  )
}

