import React, { useState, useEffect } from "react";
import requests from "../requests";
import axios from "../axios";
import "../components/Banner.css";
import { Button } from "@mui/material";
import NavBar from "../components/Header/NavBar";


function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
         <NavBar />
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <Button
            variant="outlined"
            className="banner_button"
            sx={{
              backgroundColor: "rgba(51, 51, 51, 0.5)",
              marginRight: "1rem",
            }}
          >
            Read More
          </Button>
          <Button
            variant="outlined"
            className="banner_button"
            sx={{ backgroundColor: "rgba(51, 51, 51, 0.5)" }}
          >
            My List
          </Button>
        </div>

        <h1 className="banner_description">{truncate(movie?.overview)}</h1>
      </div>
    </header>
  );
}

export default Banner;
