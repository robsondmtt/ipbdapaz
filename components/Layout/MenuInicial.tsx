import { Box, Center, Image, Text } from "@chakra-ui/react"
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
        {/* <Box bg='green.600' color="white" borderRadius={'lg'} height='80px' style={{cursor: 'pointer'}}>
              <Center h="100%" justifyContent={'space-around'}>{props.icone}{props.name}</Center>
            </Box> */}

        <Box color="gray" height='80px' my="4" style={{ cursor: 'pointer' }}>
          <Center my="2">
            <Image src={props.icone} alt={props.name} width={[8, 16]} />
          </Center>
          <Center>
            <Text fontSize={[14,18]}>
            {props.name}
            </Text>
          </Center>
        </Box>

      </Link>
    </>
  )
}

export default MenuInicial
