import { Box, Center, Image, Text } from "@chakra-ui/react"
import Link from "next/link"

interface MenuInicialProps {
  link: string
  name: string
  icone?: any
  permissao?: boolean
}

const MenuInicial = (props: MenuInicialProps) => {
  return (
    <>
      <Link href={props.link} passHref>
        {/* <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%" justifyContent={'space-around'}>{props.icone}{props.name}</Center>
            </Box> */}

        <Box color="green.800" height='80px' my="4" style={{ cursor: 'pointer' }}>
          <Center my="2">
            <Image src={props.icone} alt={props.name} width={[12, 16]} />
          </Center>
          <Center>
            <Text fontSize={[16,18]}>
            {props.name}
            </Text>
          </Center>
        </Box>

      </Link>
    </>
  )
}

export default MenuInicial
