import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";

const MovieCard = ({ id, title, type, genre, year, image, vote_average }) => {
  const formattedVoteAverage = parseFloat(vote_average).toFixed(1);

  const renderGenres = (genres) => {
    if (!genres || genres.length === 0) return "Genre Unavailable";
    if (genres.length === 1) return genres[0];

    return (
      <>
        {genres[0]}
        <Tooltip
          label={genres.slice(1).join(", ")}
          aria-label="Additional genres"
        >
          <PlusSquareIcon ml="1" color="gray.500" cursor="pointer" />
        </Tooltip>
      </>
    );
  };

  return (
    <Link href={`/movie/${id}`} passHref>
      <Box
        as="a"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.02)" }}
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Image
          src={
            image
              ? `https://image.tmdb.org/t/p/w500${image}`
              : "https://via.placeholder.com/500x300.png?text=Image+Not+Available"
          }
          alt={title}
          borderTopRadius="lg"
          height="300px"
          width="100%"
          objectFit="cover"
        />
        <Box p="6">
          <Tooltip label={title} aria-label="Movie Title">
            <Text fontWeight="bold" fontSize="lg" mb="2" isTruncated>
              {title ? title : "Title Unavailable"}
            </Text>
          </Tooltip>
          <Text fontSize="sm" color="gray.500" mb="2" isTruncated>
            {type}
          </Text>
          <Flex alignItems="center" mb="2">
            <Text fontSize="sm" color="gray.500" isTruncated>
              {renderGenres(genre.split(", "))}
            </Text>
          </Flex>
          <Text fontSize="sm" color="gray.500" mb="2">
            Score: {formattedVoteAverage}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {year}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default MovieCard;
