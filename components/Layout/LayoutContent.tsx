import { Box, Center } from "@chakra-ui/layout"

const LayoutContent = ({ children }) => {
    return (
        <Box w="full" minH="100vh">
            <Box mx={[8, 24]}  borderRadius={'md'} py="2" mt="8">
                {children}
            </Box>
        </Box>
    )
}

export default LayoutContent
