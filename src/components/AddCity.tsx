import { Box, VStack, Text } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";
import "../App.css";

export default function AddCity() {
  return (
    <Box
      display="flex"
      h="calc(90vh)"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={2}>
        <IconContext.Provider value={{ className: "center_plus_icon" }}>
          <AiOutlinePlus />
        </IconContext.Provider>
        <Text>Add a city to see something here</Text>
      </VStack>
    </Box>
  );
}
