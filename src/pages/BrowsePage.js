import React from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../requests";
import { Container, Grid } from "@mui/material";

function BrowsePage() {
  return (
    <div className="BrowsePage">
      <Banner />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
          </Grid>
          <Grid item xs={12}>
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          </Grid>
          <Grid item xs={12}>
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          </Grid>
          <Grid item xs={12}>
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          </Grid>
          <Grid item xs={12}>
            <Row title="Horror Movies" fetchUrl={requests.fetchRomanceMovies} />
          </Grid>
          <Grid item xs={12}>
            <Row title="Romance Movies" fetchUrl={requests.fetchHorrorMovies} />
          </Grid>
          <Grid item xs={12}>
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BrowsePage;
