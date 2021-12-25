import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import LayoutContent from "../../components/Layout/LayoutContent"
import Navbar from "../../components/Nav/Navbar"
import { useEffect, useState } from "react"
import moment from 'moment'
import 'moment/locale/pt-br'
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { auth, db } from "../../lib/firebase"
import Movimento from "./movimento"
import Navegacao from "./navegacao"
import Painel from "./painel"
import FormMovimento from "./formMovimento"
import useAuth from "../../hooks/useAuth"

const Tesouraria = () => {

    const [hoje, setHoje] = useState(moment())
    const [dados, setDados] = useState([])
    const [form, setForm] = useState(false)

    const [loading, setLoading] = useState(false)


    const { permissao, currentUser } = useAuth()


    useEffect(() => {
        function getMovimentos() {
            setLoading(true)
            onSnapshot(query(collection(db, 'movimentacao'),
                where('mes', '==', Number(moment(hoje).format('MM'))),
                where('ano', '==', Number(moment(hoje).format('YYYY'))),
                orderBy('data', 'desc')
            ), snapshot => {
                setDados(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            })
        }
        getMovimentos()
    }, [hoje])






    return (
        <>
            <Navbar />
            <LayoutContent>
                {/* {loading} */}
                <>
                    <Navegacao hoje={hoje} setHoje={setHoje} />

                    <Painel
                        receita={dados.filter(d => d.tipo === 'receita')}
                        despesa={dados.filter(d => d.tipo === 'despesa')} />

                    <Flex justifyContent="space-between">
                        <Box width="50%">
                            <Button
                            m="2"
                            size="sm">filtro</Button>
                        </Box>
                        {
                            currentUser && currentUser.uid === '0F9Bqa5bDqSHNRmgrMy9Xn9JVT23' && (
                                <Box align="right" width="50%">
                                    <Button
                                        colorScheme="green"
                                        m="2"
                                        size="sm"
                                        onClick={() => setForm(!form)}>
                                        {form ? 'Listar Lançamentos' : 'Novo Lançamento'}
                                    </Button>

                                </Box>
                            )
                        }
                    </Flex>





                    {form ? <FormMovimento setForm={setForm} /> : <Movimento dados={dados} />}


                </>
            </LayoutContent>
        </>
    )
}

export default Tesouraria
