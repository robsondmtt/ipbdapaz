import { Button } from '@chakra-ui/button'
import { Box, Center, Container, Flex, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import LayoutCenter from '../components/Layout/LayoutCenter'
import Navbar from '../components/Nav/Navbar'
import useAuth from '../hooks/useAuth'



export default function Home() {

  // const {user,login, logout} = useAuth()


  return (

    <>
      <Navbar />
      {/* <LayoutCenter> */}
      <Container maxW='container.xl'>
        <Center>
          <Heading>
            Bem vindo!
          </Heading>
        </Center>
        <Center>
          <Flex
            maxW={'1000px'}
            direction={['column', 'column', 'row', 'row']}
            justifyContent={'space-around'}
            alignItems={'center'}
            justify={'center'}
            w={['90vw', '90vw', '70vw']}>
            <Flex m={'2'} align={'center'} w={'full'} bg="green.300">A</Flex>
            <Flex m={'2'} align={'center'} w={'full'} bg="green.500">A</Flex>
            <Flex m={'2'} align={'center'} w={'full'} bg="green.700">A</Flex>
          </Flex>
        </Center>
      </Container>
      {/* </LayoutCenter> */}
    </>
  )
}

