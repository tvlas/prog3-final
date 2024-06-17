import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Team = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Flex
      justify="center"
      align="center"
      h="100vh"
      direction="column"
      bg="gray.100"
    >
      <Box p="4" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          This web application was developed by:
        </Text>
        <Text>Thiago Vinicios Lima de Araujo Sousa</Text>
        <Button mt="4" colorScheme="teal" onClick={handleGoHome}>
          Go to Home Page
        </Button>
      </Box>
    </Flex>
  );
};

export default Team;
