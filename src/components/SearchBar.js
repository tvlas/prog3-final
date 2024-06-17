import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    setSuggestions([]);
  };

  const handleSuggestionClick = (id) => {
    router.push(`/movie/${id}`);
    setSuggestions([]);
    setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <Box position="relative">
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleInputChange}
          borderRadius="md"
          _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
          _active={{ borderColor: "teal.400" }}
        />
        <InputRightElement width="4.5rem">
          {searchTerm && (
            <IconButton
              aria-label="Clear search"
              icon={<CloseIcon />}
              size="sm"
              h="1.75rem"
              variant="unstyled"
              _hover={{ bg: "red.400" }}
              onClick={clearSearch}
              mr="2"
            />
          )}
          <IconButton
            colorScheme="teal"
            aria-label="Search"
            icon={<SearchIcon />}
            size="sm"
            h="1.75rem"
            variant="unstyled"
            _hover={{ bg: "teal.400" }}
            onClick={handleSearch}
            mr="2"
          />
        </InputRightElement>
      </InputGroup>
      {suggestions.length > 0 && (
        <List
          position="absolute"
          mt="1"
          bg="white"
          color="black"
          zIndex="10"
          borderRadius="md"
          boxShadow="md"
          width="100%"
        >
          {suggestions.map((movie) => (
            <ListItem
              key={movie.id}
              p="2"
              _hover={{ backgroundColor: "gray.200", cursor: "pointer" }}
              onClick={() => handleSuggestionClick(movie.id)}
            >
              {movie.title}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;
