import { Box, Center } from "@chakra-ui/layout"

const LayoutCenter = ({ children }) => {
    return (
        <Box w="full" minH="100vh">
            <Center minH="100vh">
                {children}
            </Center>
        </Box>
    )
}

export default LayoutCenter
