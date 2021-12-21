import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import LayoutContent from "../../components/Layout/LayoutContent"
import Navbar from "../../components/Nav/Navbar"
import { useEffect, useState } from "react"
import moment from 'moment'
import 'moment/locale/pt-br'
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../../lib/firebase"
import  Movimento  from "./movimento"
import  Navegacao  from "./navegacao"
import  Painel  from "./painel"
import  FormMovimento  from "./formMovimento"

const Tesouraria = () => {

    const [hoje, setHoje] = useState(moment())
    const [dados, setDados] = useState([])
    const [form, setForm] = useState(false)



    useEffect(() => {
        function getMovimentos() {
            onSnapshot(query(collection(db, 'movimentacao'),
                where('mes', '==', Number(moment(hoje).format('MM'))),
                where('ano', '==', Number(moment(hoje).format('YYYY'))),
                // orderBy('data', 'desc')
            ), snapshot => {
                setDados(
                    snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            })

        }
        getMovimentos()
    }, [hoje])


  



    return (
        <>
            <Navbar />
            <LayoutContent>


                <Navegacao hoje={hoje} setHoje={setHoje} />

                <Painel
                    receita={dados.filter(d => d.tipo === 'receita')}
                    despesa={dados.filter(d => d.tipo === 'despesa')} />
                <Box align="right" >
                    <Button
                        colorScheme="green"
                        m="2"
                        onClick={() => setForm(!form)}>
                        {form ? 'Listar Lançamentos' : 'Novo Lançamento'}
                    </Button>

                </Box>

                { form ? <FormMovimento setForm={setForm} /> : <Movimento dados={dados} /> }
                    
                

            </LayoutContent>
        </>
    )
}

export default Tesouraria
