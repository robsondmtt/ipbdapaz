import { Box, Flex, Heading } from "@chakra-ui/react"

interface PainelProps {
    data: any
}

export const Painel = (props: PainelProps) => {
    return (
        <>
            <Flex w="full" >
                <Box w="100%" mx={["1", "4"]} align="center" alignItems={'center'}>
                    <Box bg="blue.500" color="white" borderRadius="lg" py="2" my="6">
                        <Heading size="md">Receitas</Heading>
                        <h4>0,00</h4>
                    </Box>
                </Box>
                <Box w="100%" mx={["1", "4"]} align="center" alignItems={'center'}>
                    <Box bg="red.500" color="white" borderRadius="lg" py="2" my="6">
                        <Heading size="md">Despesas</Heading>
                        <h4>0,00</h4>
                    </Box>
                </Box>
                <Box w="100%" mx={["1", "4"]} align="center" alignItems={'center'}>
                    <Box bg="green.500" color="white" borderRadius="lg" py="2" my="6">
                        <Heading size="md">Saldo</Heading>
                        <h4>0,00</h4>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}
