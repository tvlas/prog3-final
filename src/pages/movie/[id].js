import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Box color="red.500">{error}</Box>
      </Flex>
    );
  }

  if (!movie) {
    return null;
  }

  const handleClose = () => {
    router.push("/");
  };

  return (
    <Box p="4" bg="gray.800" minH="100vh">
      <Box p="6" maxW="900px" mx="auto" position="relative">
        <IconButton
          icon={<CloseIcon />}
          position="absolute"
          top="10px"
          right="10px"
          borderRadius="full"
          onClick={handleClose}
          bg="teal"
          color="white"
          _hover={{ bg: "gray.600" }}
        />
        <Box
          p="6"
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          border="1px"
          borderColor="gray.200"
        >
          <Flex align="flex-start" justify="center" mb="4" flexWrap="wrap">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                borderRadius="md"
                boxShadow="lg"
                maxW="350px"
                maxH="525px"
                mr="4"
              />
            ) : (
              <Box
                h="525px"
                w="350px"
                bg="gray.200"
                d="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="md"
                boxShadow="lg"
                mr="4"
              >
                <Text fontSize="lg">No Image</Text>
              </Box>
            )}

            <Box flex="1">
              <Heading as="h2" size="xl" mb="4">
                {movie.title}
              </Heading>
              <Text fontSize="lg" mb="2">
                Release Year:{" "}
                {movie.release_date
                  ? movie.release_date.split("-")[0]
                  : "Unknown Year"}
              </Text>
              <Text fontSize="lg" mb="2">
                Genres:{" "}
                {movie.genres
                  ? movie.genres.map((genre) => genre.name).join(", ")
                  : "No Genres Available"}
              </Text>
              <Text fontSize="lg" mb="2">
                Rating:{" "}
                {movie.vote_average !== undefined
                  ? movie.vote_average
                  : "Not Rated"}
              </Text>

              <Box mt="4">
                <Heading as="h3" size="md" mb="2">
                  Overview
                </Heading>
                <Box
                  maxH="300px"
                  overflowY="auto"
                  p="4"
                  bg="gray.50"
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  boxShadow="inner"
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "12px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "gray.100",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "gray.500",
                      borderRadius: "10px",
                      border: "3px solid gray.100",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "gray.600",
                    },
                  }}
                >
                  <Text fontSize="lg">
                    {movie.overview ? movie.overview : "No Overview Available"}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;
