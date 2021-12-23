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
                    <Box bg={item.tipo === 'receita' ? 'green.200' : 'red.200'} p="4" key={item.id} borderRadius="lg" my="4">
                        <Flex>
                            <Badge variant='solid' colorScheme={item.tipo === 'receita' ? 'green' : 'red'}>
                                {item.tipo}
                            </Badge>
                            <Spacer />
                            <Badge variant='solid' colorScheme={item.tipo === 'receita' ? 'green' : 'red'}>
                                {moment(item.data.toDate()).format('DD/MM/YYYY')}
                            </Badge>
                            {/* <Image
                                width={16}
                                src='/icones/bau.png'
                                alt='Dan Abramov'
                            /> */}

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


export default Movimento