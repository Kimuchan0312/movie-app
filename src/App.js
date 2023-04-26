import ThemeProvider from "./contexts/ThemeProvider";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import BrowsePage from "./pages/BrowsePage";
import LoginPage from "./pages/LoginPage";
import AuthRequire from "./routes/AuthRequire";
import { AuthProvider } from "./contexts/AuthContext";
import DetailPage from "./pages/DetailPage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <div>
      <ThemeProvider> 
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<AuthRequire><BrowsePage /></AuthRequire>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/movies" element={<MoviePage />} />
              <Route path="/movies/:movieId" element={<DetailPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider> 
    </div>
  );
}

export default App;
