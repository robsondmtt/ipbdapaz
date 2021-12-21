import { Badge, Box, Center, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import moment from "moment"

interface MovimentoProps {
    dados: any
}
export const Movimento = (props: MovimentoProps) => {


    return (
        <>
            {
                props.dados && props.dados.map(item => (
                    <Box bg={item.tipo === 'receita' ? 'green.200' : 'red.200'} p="4" key={item.id} borderRadius="lg" my="4">
                        <Flex>
                            <Badge variant='solid' colorScheme={item.tipo === 'receita' ? 'green' : 'red'}>
                                {item.tipo}
                            </Badge>
                            <Spacer />
                            <Text>{moment(item.data.toDate()).format('DD/MM/YYYY')}</Text>

                        </Flex>
                        <Center>
                            <Text fontSize="lg">{item.descricao}</Text>
                        </Center>
                        <Center>
                            <Text>{item.observacao}</Text>
                        </Center>
                        <Center>
                            <Text fontSize="2xl">
                                <strong>
                                    {item.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                </strong>
                            </Text>
                        </Center>
                    </Box>
                ))
            }
        </>
    )
}
