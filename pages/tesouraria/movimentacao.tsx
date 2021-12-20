import { Box } from "@chakra-ui/react"
import { Movimento } from "./movimento"

interface MovimentacaoProps {
    data: any
}
export const Movimentacao = (props: MovimentacaoProps) => {
    return (
        <>
            <Movimento />
        </>
    )
}
