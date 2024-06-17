import { Grid } from "@chakra-ui/react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          type="Movie"
          genre={movie.genre_ids.join(", ")}
          year={movie.release_date.split("-")[0]}
          image={movie.poster_path}
          rating={movie.vote_average}
        />
      ))}
    </Grid>
  );
};

export default MovieList;
