import { Badge, Box, Center, Flex,  Spacer, Text } from "@chakra-ui/react"
import moment from "moment"

interface MovimentoProps {
    dados: any
}
const Movimento = (props: MovimentoProps) => {

const contador = 1
    return (
        <>

            {
                props.dados && props.dados.map((item,k) => (
                    
                    <Box bg={item.tipo === 'receita' ? 'green.100' : 'red.100'} p="2" key={item.id} borderRadius="lg" my="4">
                        <Flex>
                            <Badge variant='solid' colorScheme={item.tipo === 'receita' ? 'green' : 'red'}>
                                {item.tipo}
                            </Badge>
                            <Spacer />
                            <Badge variant='solid' colorScheme={item.tipo === 'receita' ? 'green' : 'red'}>
                                {moment(item.data.toDate()).format('DD/MM/YYYY')}
                            </Badge>
                           

                        </Flex>
                        <Center>
                            <Text fontSize={[18,20,22]}>{k+1}. {item.descricao}</Text>
                        </Center>
                        <Center>
                            <Text fontSize={[14,16,18]}>{item.observacao}</Text>
                        </Center>
                        <Center>
                            <Text fontSize={[20, 22, 24]}>
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


export default Movimento