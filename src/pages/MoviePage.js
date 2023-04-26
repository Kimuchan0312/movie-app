import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Box, Stack } from "@mui/system";
import { FormProvider } from "../components/form";
import MovieFilter from "../components/MovieFilter";
import { Alert } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";
import NavBar from "../components/Header/NavBar";

const API_KEY = "ce8c0ed4205267c8ba17c39781b70577";

const requests = {
  fetchPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
};

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const defaultValues = {
    genre: "All",
    searchQuery: "",
  };

  const methods = useForm({
    defaultValues,
  });
  const { watch, reset, setValue } = methods;
  const filters = watch();
  const filterMovies = applyFilter(movies, filters, genres);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const moviesRes = await axios.get(requests.fetchPopular);
        const genresRes = await axios.get(requests.fetchGenres);
        setMovies(moviesRes.data.results);
        setGenres(genresRes.data.genres);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log(movies);

  return (
    <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
      <NavBar blackBackground sx={{ height: "50px" }} setValue={setValue} />
      <Stack direction="collumn">
        <FormProvider methods={methods}>
          <MovieFilter resetFilter={reset} methods={methods} />
          <MovieSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        </FormProvider>

        <Stack sx={{ flexGrow: 1, padding: "30px 40px" }}>
          <FormProvider methods={methods}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
              mb={2}
            ></Stack>
          </FormProvider>
          <Box>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <MovieList movies={filterMovies} />
                )}
              </>
            )}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

function applyFilter(movies, filters, genres) {
  let filteredMovies = movies;

  if (filters.genre !== "All") {
    const genreId = genres.find((genre) => genre.name === filters.genre).id;
    filteredMovies = movies.filter((movie) => movie.genre_ids.includes(genreId));
  }

  if (filters.searchQuery) {
    filteredMovies = movies.filter((movie) =>
      movie.original_title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase())
    );
  }
  return filteredMovies;
}

export default MoviePage;
