import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import { CardActionArea, Typography } from "@mui/material";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 300, height: 300 }} onClick={() => navigate(`/movies/${movie.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          width="300"
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie.original_title}
        />
        <CardContent>
        <Typography gutterBottom variant="h6" component="div">
              {movie?.title || movie?.name || movie?.original_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           {movie.release_date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;