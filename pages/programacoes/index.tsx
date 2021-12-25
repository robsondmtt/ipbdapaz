import { Center, Text } from "@chakra-ui/react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import moment from "moment"
import { useEffect, useState } from "react"
import LayoutContent from "../../components/Layout/LayoutContent"
import Navbar from "../../components/Nav/Navbar"
import { db } from "../../lib/firebase"
import { Programacao } from "./programacao"

const Programacoes = () => {

    const [hoje, setHoje] = useState(moment())
    const [dados, setDados] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        function getProgramacoes() {
            setLoading(true)
            onSnapshot(query(collection(db, 'programacoes'),
                where('mes', '==', Number(moment(hoje).format('MM'))),
                where('ano', '==', Number(moment(hoje).format('YYYY'))),
                orderBy('data', 'desc')
            ), snapshot => {
                setDados(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            })
        }
        getProgramacoes()
    }, [hoje])

    

    return (
        <div>
            <Navbar />
            <LayoutContent>
                <Center mb="4">
                    <Text fontSize="2xl"> 
                        <strong>Programações</strong>
                    </Text>
                </Center>
                { <Programacao dados={dados} />}
                
            </LayoutContent>
        </div>
    )
}

export default Programacoes
