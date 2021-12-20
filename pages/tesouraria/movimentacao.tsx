import { Box } from "@chakra-ui/react"
import { collection, getFirestore, where } from "firebase/firestore"
import moment from "moment"
import { useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import Loading from "../../components/Loading"
import {db} from "../../lib/firebase"
import { Movimento } from "./movimento"

interface MovimentacaoProps {
    data: any
}
export const Movimentacao = (props: MovimentacaoProps) => {

    const [movimentacao, loading, error] = useCollection(
        collection(db, 'movimentacao'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
            
        }
    )
    const [mes,setMes] = useState(+moment(props.data).format('MM'))
    const [ano,setAno] = useState(+moment(props.data).format('YYYY'))

    console.log('movimentacao',typeof mes);
    

    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <Loading />}
            {movimentacao && (
                movimentacao.docs
                .filter(doc => doc.data().mes === mes && doc.data().ano === ano)
                .map(item => (
                    <Movimento dados={{id:item.id, ...item.data()}} key={item.id} />
                ))
            )}
        </>
    )
}
