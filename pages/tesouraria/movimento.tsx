import { Badge, Box, Center, Flex, Heading, Image, Spacer, Text } from "@chakra-ui/react"
import moment from "moment"
import Navbar from "../../components/Nav/Navbar"

interface MovimentoProps {
    dados: any
}
const Movimento = (props: MovimentoProps) => {


    return (
        <>

            {
                props.dados && props.dados.map(item => (
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
                            <Text fontSize={[18,20,22]}>{item.descricao}</Text>
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