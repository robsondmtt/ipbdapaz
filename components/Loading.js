import { Center } from '@chakra-ui/react'
import LayoutCenter from './Layout/LayoutContent'
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <LayoutCenter>
            <Center>
                <ReactLoading type={'bubbles'} color={'green'} height={200} width={100} />
            </Center>
        </LayoutCenter>

    )
}

export default Loading
