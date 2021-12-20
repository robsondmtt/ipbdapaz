import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import LayoutContent from "../../components/Layout/LayoutContent"
import Navbar from "../../components/Nav/Navbar"
import { useState } from "react"
import moment from 'moment'
import 'moment/locale/pt-br'
import { Painel } from "./painel"
import { Movimentacao } from "./Movimentacao"
import { Navegacao } from "./navegacao"

const Tesouraria = () => {
    const [hoje, setHoje] = useState(moment())
    
    return (
        <>
            <Navbar />
            <LayoutContent>
                
                <Navegacao setData={setHoje} data={hoje} />
                <Painel data={hoje} />
                <Movimentacao data={hoje} />

            </LayoutContent>
        </>
    )
}

export default Tesouraria
