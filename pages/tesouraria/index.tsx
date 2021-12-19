import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import LayoutContent from "../../components/Layout/LayoutContent"
import Navbar from "../../components/Nav/Navbar"
import { useState } from "react"
import moment from 'moment'
import 'moment/locale/pt-br'

const Tesouraria = () => {
    const [hoje, setHoje] = useState(moment())
    const [mes, setMes] = useState()
    const [ano, setAno] = useState()
   


    return (
        <>
            <Navbar />
            <LayoutContent>
                <Flex w="full" bg='gray.200' py="2" borderRadius="lg">
                    <Box w="100%" mx="4">
                        <Heading size="lg"   
                            onClick={() => setHoje(moment(hoje).subtract(1, 'months'))}
                            >
                                <ChevronLeftIcon color="green.800" />
                        </Heading>
                    </Box>
                    <Box w="100%" align="center">
                        <Text color="green.800" >
                            <Heading as="h3" size="lg">
                                {moment(hoje).format('MMM')}/{moment(hoje).format('YYYY')}
                            </Heading>
                        </Text>
                    </Box>
                    <Box w="100%" align="right" mx="4">
                        <Heading size="lg"
                            onClick={() => setHoje(moment(hoje).add(1, 'months'))}    
                            >
                            <ChevronRightIcon color="green.800" />
                        </Heading>
                    </Box>
                </Flex>
                <Flex w="full" >
                    <Box w="100%" mx={["1", "4"]} align="center" alignItems={'center'}>
                        <Box bg="blue.500" color="white" borderRadius="lg" py="2" my="6">
                            <Heading size="md">Receitas</Heading>
                            <Heading size="md">0,00</Heading>
                        </Box>
                    </Box>
                    <Box w="100%" mx={["1", "4"]} align="center" alignItems={'center'}>
                        <Box bg="red.500" color="white" borderRadius="lg" py="2" my="6">
                            <Heading size="md">Despesas</Heading>
                            <Heading size="md">0,00</Heading>
                        </Box>
                    </Box>
                    <Box w="100%" mx={["1", "4"]} align="center" alignItems={'center'}>
                        <Box bg="green.500" color="white" borderRadius="lg" py="2" my="6">
                            <Heading size="md">Saldo</Heading>
                            <Heading size="md">0,00</Heading>
                        </Box>
                    </Box>

                </Flex>


            </LayoutContent>
        </>
    )
}

export default Tesouraria
