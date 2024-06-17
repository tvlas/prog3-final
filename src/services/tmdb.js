import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (genre) => {
  const url = genre
    ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`
    : `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchGenres = async () => {
  const response = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
};

export const fetchMovieById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};
