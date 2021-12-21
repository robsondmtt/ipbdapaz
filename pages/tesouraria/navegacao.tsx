import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import moment from "moment"

interface NavegacaoProps {
    hoje: any
    setHoje: (any) => void
}

export const Navegacao = (props: NavegacaoProps) => {

    function backMonth() {
        props.setHoje(moment(props.hoje).subtract(1, 'months'))

    }
    function nextMonth() {
        props.setHoje(moment(props.hoje).add(1, 'months'))

    }

    return (
        <Flex w="full" bg='gray.200' py="2" borderRadius="lg">
            <Box w="100%" mx="4">
                <Heading size="md"
                    onClick={() => backMonth()} >
                    <ChevronLeftIcon color="green.800" />
                </Heading>
            </Box>
            <Box w="100%" align="center">
                <Heading size="md" color="green.800" >
                    <Text>
                        {moment(props.hoje).format('MMM')}/{moment(props.hoje).format('YY')}
                    </Text>
                </Heading>
            </Box>
            <Box w="100%" align="right" mx="4">
                <Heading size="md"
                    onClick={() => nextMonth()}    >
                    <ChevronRightIcon color="green.800" />
                </Heading>
            </Box>
        </Flex>
    )
}
