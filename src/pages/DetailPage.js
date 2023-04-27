import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardMedia, Typography, Box, Stack } from "@mui/material";
import NavBar from "../components/Header/NavBar";

function DetailPage() {
  let { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const API_KEY = "ce8c0ed4205267c8ba17c39781b70577";
  const fetchDetails = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchDetails);
      setMovie(request.data);
    }
    fetchData();
  }, [fetchDetails]);

  console.log(movie);

  if (!movie) {
    return null;
  }
  return (
    <Stack
      spacing={2}
      useFlexGap
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "black" }}
    >
      <NavBar blackBackground sx={{ height: "50px" }} />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ width: { xs: "100%", sm: "auto" }, backgroundColor: "black" }}
      >
        <Card sx={{ padding: 10, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "flex-start",
              spacing: 2,
            }}
          >
            <CardMedia
              component="img"
              height="300"
              width="200"
              image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie.original_title}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: 5,
                paddingLeft: 10,
                color: "white",
              }}
            >
              <Typography component="div" variant="h5" color="white">
                {movie?.title || movie?.name || movie?.original_name}
              </Typography>
              <Typography variant="subtitle1" color="white" component="div">
                {movie?.release_date} | {movie?.original_language}
              </Typography>
              <Typography component="div" variant="h6">
                Overview:
              </Typography>
              <Typography variant="subtitle1" color="white" component="div">
                {movie?.overview}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Stack>
    </Stack>
  );
}

export default DetailPage;
