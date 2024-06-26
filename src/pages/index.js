import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import {
  fetchGenres,
  fetchMovies,
  selectError,
  selectGenres,
  selectLoading,
  selectMovies,
  selectTotalPages,
} from "../store/moviesSlice";

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const genres = useSelector(selectGenres);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalPages = useSelector(selectTotalPages);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchMovies({ genreId: selectedGenre, page: currentPage, query }));
    dispatch(fetchGenres());
  }, [dispatch, selectedGenre, currentPage, query]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setSelectedGenre("");
    setCurrentPage(1);
  };

  const renderGenres = (isDropdown = false) =>
    genres.map((genre) =>
      isDropdown ? (
        <MenuItem key={genre.id} onClick={() => handleGenreChange(genre.id)}>
          {genre.name}
        </MenuItem>
      ) : (
        <Link
          key={genre.id}
          onClick={() => handleGenreChange(genre.id)}
          mb="2"
          display="block"
          color={genre.id === selectedGenre ? "white" : "gray.500"}
          cursor="pointer"
          _hover={{ color: "white" }}
          bg={genre.id === selectedGenre ? "gray.600" : "transparent"}
          p="2"
          rounded="sm"
        >
          {genre.name}
        </Link>
      )
    );

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p="4">
      <Head>
        <title>
          My Movies |{" "}
          {selectedGenre
            ? genres.find((g) => g.id === selectedGenre).name
            : "All Genres"}
        </title>
      </Head>
      <Header onSearch={handleSearch} />
      <Flex mt="4" direction={{ base: "column", md: "row" }}>
        {isMobile ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb="4">
              Select Genre
            </MenuButton>
            <MenuList>{renderGenres(true)}</MenuList>
          </Menu>
        ) : (
          <Box
            w="250px"
            bg="gray.800"
            color="white"
            boxShadow="md"
            rounded="md"
            overflow="hidden"
          >
            <Text
              fontWeight="bold"
              p="4"
              bg="teal"
              borderBottomWidth="2px"
              borderBottomColor="white"
            >
              Select Genre
            </Text>
            <Box as="nav" p="3">
              {renderGenres()}
            </Box>
          </Box>
        )}
        <Box flex="1" pl={{ base: "0", md: "4" }}>
          {loading && (
            <Flex justify="center" align="center" h="100vh">
              <Spinner />
            </Flex>
          )}
          {error && <Box color="red.500">{error}</Box>}
          {!loading && !error && (
            <Grid
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              gap={6}
            >
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  type={movie.media_type}
                  genre={
                    movie.genre_ids
                      ? movie.genre_ids
                          .map((id) => {
                            const genre = genres.find(
                              (genre) => genre.id === id
                            );
                            return genre ? genre.name : "Unknown Genre";
                          })
                          .join(", ")
                      : "Unknown Genre"
                  }
                  year={
                    movie.release_date
                      ? movie.release_date.split("-")[0]
                      : "Unknown Year"
                  }
                  image={movie.poster_path}
                  vote_average={movie.vote_average}
                  mb="4"
                />
              ))}
            </Grid>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
