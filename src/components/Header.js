import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }) => {
  return (
    <Flex
      as="header"
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.800"
      color="white"
      position="relative"
    >
      <Heading as="h1" size="lg">
        Movies Database
      </Heading>
      <Box w="40%">
        <SearchBar onSearch={onSearch} />
      </Box>
      <Link href="/team" passHref>
        <Button colorScheme="orange" variant="solid">
          See Developers
        </Button>
      </Link>
    </Flex>
  );
};

export default Header;
