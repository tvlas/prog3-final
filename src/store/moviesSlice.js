import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ genreId, page, query }) => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;

    if (genreId) {
      url += `&with_genres=${genreId}`;
    }

    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    }

    const response = await axios.get(url);
    return response.data;
  }
);

export const fetchGenres = createAsyncThunk("movies/fetchGenres", async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    genres: [],
    loading: false,
    error: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectMovies = (state) => state.movies.movies;
export const selectGenres = (state) => state.movies.genres;
export const selectLoading = (state) => state.movies.loading;
export const selectError = (state) => state.movies.error;
export const selectTotalPages = (state) => state.movies.totalPages;

export default moviesSlice.reducer;
