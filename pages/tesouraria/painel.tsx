import { Box, Flex, Heading, Text } from "@chakra-ui/react"

interface PainelProps {
    receita: any;
    despesa: any;
}
const Painel = (props: PainelProps) => {

    console.log('receita: ', props.receita);
    console.log('despesa: ', props.despesa);

    const totalReceita = props.receita.reduce(getTotalReceita, 0)
    function getTotalReceita(total, item) {
        return total + item.valor
    }
    const totalDespesa = props.despesa.reduce(getTotalDespesa, 0)
    function getTotalDespesa(total, item) {
        return total + item.valor
    }

    return (
        <Flex w="full" >
            <Box w="100%" mx={["1", "4"]} align="center" alignItems={'center'}>
                <Box bg="blue.500" color="white" borderRadius="lg" py="2" my="6">
                    <Heading size="md">Receitas</Heading>
                    <Text>
                        {
                            totalReceita ?
                            totalReceita.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) 
                                : (0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                        }
                    </Text>
                </Box>
            </Box>
            <Box w="100%" mx={["1", "4"]} align="center" alignItems={'center'}>
                <Box bg="red.500" color="white" borderRadius="lg" py="2" my="6">
                    <Heading size="md">Despesas</Heading>
                    <Text>
                        {
                            totalDespesa ?
                            totalDespesa.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) 
                            : (0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                        }
                    </Text>
                </Box>
            </Box>
            <Box w="100%" mx={["1", "4"]} align="center" alignItems={'center'}>
                <Box bg="green.500" color="white" borderRadius="lg" py="2" my="6">
                    <Heading size="md">Saldo</Heading>
                    <Text>
                        {
                        (totalReceita - totalDespesa)
                        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                        }
                    </Text>
                </Box>
            </Box>
        </Flex>
    )
}

export default Painel