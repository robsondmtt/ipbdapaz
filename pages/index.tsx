import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/react'
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
      <LayoutCenter>
        <Heading>
          Bem vindo!

        </Heading>
        
      </LayoutCenter>
    </>
  )
}

