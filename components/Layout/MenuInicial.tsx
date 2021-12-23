import { Box, Center } from "@chakra-ui/react"
import Link from "next/link"

interface MenuInicialProps {
    link: string
    name: string
    icone?: any
}

const MenuInicial = (props: MenuInicialProps) => {
    return (
        <>
            <Link href={props.link} passHref>
            <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%" justifyContent={'space-around'}>{props.icone}{props.name}</Center>
            </Box>
          </Link>
        </>
    )
}

export default MenuInicial
