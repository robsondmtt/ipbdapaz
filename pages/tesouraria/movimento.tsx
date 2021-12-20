import { Box } from "@chakra-ui/react"

interface MovimentoProps {
    dados: any
}
export const Movimento = (props: MovimentoProps) => {

    console.log(props.dados);
    
    return (
        <Box p={2}>
            {props.dados.descricao}
        </Box>
    )
}
