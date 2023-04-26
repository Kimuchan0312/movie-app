import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from '@mui/icons-material/Search';
import '../Header/NavBar.css'
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const pages = ["Home", "Trending", "Movie"];

function NavBar({ blackBackground, setValue }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const { user, logout } = auth;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [goToLogin, setGoToLogin] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageNavigation = (page) => {
    if (page === "Movie") {
      navigate("/movies");
    }
    if (page === "Home") {
      navigate("/");
    }
    handleCloseNavMenu();
  };

  const handleSearchIconClick = () => {
    setValue("searchQuery", "");
  };


  if (goToLogin) {
    return navigate("/login");
  }

  return (
    <AppBar className='nav' position="static" elevation={0} sx={{ backgroundColor: blackBackground ? "black" : "transparent" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "futura",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KIM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageNavigation(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h3"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "futura",
              fontWeight: 900,
              fontSize: "2.5rem",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KIM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageNavigation(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ margin: 3 }}>{user.username}</Typography>
              <Button color="inherit" onClick={() => logout(() => navigate("/"))}>
                Sign Out
              </Button>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => {setGoToLogin(true)}}>
              Login
            </Button>
          )}
          <IconButton size="large" aria-label="search" color="inherit" onClick={handleSearchIconClick}>
            <SearchIcon />
          </IconButton>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
