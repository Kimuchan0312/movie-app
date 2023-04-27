import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Box, Stack } from "@mui/system";
import { FormProvider } from "../components/form";
import MovieFilter from "../components/MovieFilter";
import { Alert } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import MovieList from "../components/MovieList";
import NavBar from "../components/Header/NavBar";
import { useMemo } from "react";

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

  const filters = methods.watch();
  const { reset, setValue } = methods;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const moviesRes = await axios.get(requests.fetchPopular);
        setMovies(moviesRes.data.results);
        const genresRes = await axios.get(requests.fetchGenres);
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

  const movieList = useMemo(() => {
    const filterGenres = (filters, genres) => {
      let filteredMovies = movies;
      if (filters.genre !== "All") {
        const genreId = genres.find((genre) => genre.name === filters.genre).id;
        filteredMovies = movies.filter((movie) =>
          movie.genre_ids.includes(genreId)
        );
      }

      if (filters.searchQuery) {
        filteredMovies = movies.filter((movie) =>
          movie.original_title
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        );
      }
      return filteredMovies;
    };

    if (genres.length > 0) {
      return filterGenres({ ...filters, searchQuery }, genres);
    }
    return [];
  }, [genres, filters, searchQuery, movies]);

  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      useFlexGap
      flexWrap="wrap"
    >
    <NavBar
        blackBackground
        sx={{ height: "50px", width: "100%" }}
        setValue={setValue}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    <Stack direction={{ xs: "column", sm: "row" }}
    sx={{ width: { xs: "100%", sm: "100%" }}}>
      <FormProvider methods={methods}>
        <MovieFilter resetFilter={reset} methods={methods} />
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
                    <MovieList movies={movieList} />
                  )}
                </>
              )}
            </Box>
          </Stack>
        </Stack>
      </Stack>
  );
}

export default MoviePage;
