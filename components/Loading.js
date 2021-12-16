import { Center } from '@chakra-ui/react'
import LayoutCenter from './Layout/LayoutCenter'
const Loading = ({ type, color }) => {
    return (
       <LayoutCenter>
           <Center>Carregando...</Center>
       </LayoutCenter>

    )
}

export default Loading
