import { Badge, Box, Center, Flex, Stack, Text } from "@chakra-ui/react"
import moment from "moment"
import 'moment/locale/pt-br'

interface ProgramacaoProps {
    dados: any
}

export const Programacao = ({ dados }) => {

    return (
        <>

            {
                dados && dados.map((item, k) => (

                    <Stack key={item.id} my="4">

                        <Box bg="green.400" borderTopRadius="lg" py="4" >
                            <Center h="100%">
                                <Text fontSize="lg" color="white">
                                    <strong>
                                        {item.titulo.toUpperCase()}
                                    </strong>
                                </Text>
                            </Center>
                        </Box>
                        <Box bg="white">
                            <Flex justifyContent="space-between" py="2">
                                <Badge bg="orange" p="4" w="30%">
                                    {moment(item.data.toDate()).format('dddd')}
                                </Badge>
                                <Badge p="4" w="70%">
                                    {moment(item.data.toDate()).format('LL')} -
                                    {item.hora}
                                </Badge>
                            </Flex>
                        </Box>
                        <Box>
                            <Center>
                                <Text color="gray">
                                    Local: {item.local}
                                </Text>
                            </Center>
                        </Box>
                        <hr />
                    </Stack>



                ))
            }
        </>
    )
}
