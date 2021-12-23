import { Box, Flex, Grid, Heading, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react"

interface PainelProps {
    receita: any;
    despesa: any;
}
const Painel = (props: PainelProps) => {

    const [isLargerThan1280] = useMediaQuery('(min-width: 600px)')

    const totalReceita = props.receita.reduce(getTotalReceita, 0)
    function getTotalReceita(total, item) {
        return total + item.valor
    }
    const totalDespesa = props.despesa.reduce(getTotalDespesa, 0)
    function getTotalDespesa(total, item) {
        return total + item.valor
    }

    return (
        <>
            <Box>
                <Box width={['50%', '50%']} bg="red">a</Box>
                <Box width={['50%', '50%']} bg="green">b</Box>
                <Box width={['100%','100%']} bg="teal">c</Box>
            </Box>



            <Flex w="full" >
                <Box w="100%" mx={["1", "1"]} align="center" alignItems={'center'}>
                    <Box bg="blue.500" color="white" borderRadius="lg" py="2" my="6">
                        <Text fontSize={[20,22]}><strong>Receitas</strong></Text>
                        <Text fontSize={[14,16]}>
                            {
                                totalReceita ?
                                    totalReceita.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                                    : (0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                            }
                        </Text>
                    </Box>
                </Box>
                <Box w="100%" mx={["1", "1"]} align="center" alignItems={'center'}>
                    <Box bg="red.500" color="white" borderRadius="lg" py="2" my="6">
                        <Text fontSize={[20,22]}><strong>Despesas</strong></Text>
                        <Text fontSize={[14,16]}>
                            {
                                totalDespesa ?
                                    totalDespesa.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                                    : (0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                            }
                        </Text>
                    </Box>
                </Box>
                <Box w="100%" mx={["1", "1"]} align="center" alignItems={'center'}>
                    <Box bg="green.500" color="white" borderRadius="lg" py="2" my="6">
                        <Text fontSize={[20,22]}><strong>Saldo</strong></Text>
                        <Text fontSize={[14,16]}>
                            {
                                (totalReceita - totalDespesa)
                                    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                            }
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}

export default Painel