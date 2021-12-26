import { Box, Button, ButtonGroup, Flex, Heading, Image, Text } from "@chakra-ui/react"
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
    const [receitas, setReceitas] = useState([])
    const [despesas, setDespesas] = useState([])
    const [form, setForm] = useState(false)
    const [filtro, setFiltro] = useState('todos')


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

        function getMovimentosReceitas() {
            setLoading(true)
            onSnapshot(query(collection(db, 'movimentacao'),
                where('mes', '==', Number(moment(hoje).format('MM'))),
                where('ano', '==', Number(moment(hoje).format('YYYY'))),
                where('tipo', '==', 'receita'),
                orderBy('data', 'desc')
            ), snapshot => {
                setDados(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            })
        }

        function getMovimentosDespesas() {
            setLoading(true)
            onSnapshot(query(collection(db, 'movimentacao'),
                where('mes', '==', Number(moment(hoje).format('MM'))),
                where('ano', '==', Number(moment(hoje).format('YYYY'))),
                where('tipo', '==', 'despesa'),
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
                        <ButtonGroup size='sm' isAttached mt="2" >
                            <Button 
                                colorScheme={filtro === 'todos' ? 'orange' : 'gray'}
                                onClick={() => setFiltro('todos')}
                                 mr='-px'
                                //  leftIcon={
                                //      <Image alt={"todos"} scr={"./icones/tudo.png"} width="24" />
                                //  }
                                 >
                                    Todos 
                                 </Button>
                            <Button
                                colorScheme={filtro === 'receita' ? 'green' : 'gray'}
                                onClick={() => setFiltro('receita')}
                                 mr='-px'>Receitas</Button>
                            <Button 
                                colorScheme={filtro === 'despesa' ? 'red' : 'gray'}
                                onClick={() => setFiltro('despesa')}
                                >Despesas</Button>
                        </ButtonGroup>
                        <Box width="50%">
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





                    {
                        form ? <FormMovimento setForm={setForm} /> 
                        : <Movimento 
                        dados={
                            filtro === 'todos' ? dados : filtro === 'receita' ? 
                            dados.filter(d => d.tipo === 'receita') : dados.filter(d => d.tipo === 'despesa')
                            } />}


                </>
            </LayoutContent>
        </>
    )
}

export default Tesouraria
