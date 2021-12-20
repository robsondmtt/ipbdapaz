import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { useState } from "react"
import moment from 'moment'
import 'moment/locale/pt-br'

interface NavegacaoProps {
    setData:  (any) => void
    data: any
}
export const Navegacao = (props: NavegacaoProps) => {

    
    return (
        <>
            <Flex w="full" bg='gray.200' py="2" borderRadius="lg">
                    <Box w="100%" mx="4">
                        <Heading size="lg"   
                            onClick={() => props.setData(moment(props.data).subtract(1, 'months'))} >
                                <ChevronLeftIcon color="green.800" />
                        </Heading>
                    </Box>
                    <Box w="100%" align="center">
                        <Text color="green.800" >
                            <Heading as="h3" size="lg">
                                {moment(props.data).format('MMM')}/{moment(props.data).format('YYYY')}
                            </Heading>
                        </Text>
                    </Box>
                    <Box w="100%" align="right" mx="4">
                        <Heading size="lg"
                            onClick={() => props.setData(moment(props.data).add(1, 'months'))}    >
                            <ChevronRightIcon color="green.800" />
                        </Heading>
                    </Box>
                </Flex>
        </>
    )
}
