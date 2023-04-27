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
import "../Header/NavBar.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Grid from '@mui/material/Grid';

const pages = ["Home", "Trending", "Movie"];

function NavBar({ blackBackground, setValue, searchQuery, setSearchQuery }) {
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

  if (goToLogin) {
    return navigate("/login");
  }

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <AppBar
      className="nav"
      position="static"
      elevation={0}
      sx={{ backgroundColor: blackBackground ? "black" : "transparent" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Grid container alignItems="center">
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "futura",
              fontWeight: 900,
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
          <Grid item xs={6} sm={3} md={2}>
          <Typography
            variant="h7"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "futura",
              fontWeight: 600,
              fontSize: "2.5rem",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              left: "0px",
            }}
          >
            KIM
          </Typography>
          </Grid>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, margin: 0 }}>
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
          <Grid item xs={6} sm={3} md={2}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
          </Grid>

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ margin: 3 }}>{user.username}</Typography>
              <Button
                color="inherit"
                onClick={() => logout(() => navigate("/"))}
              >
                Sign Out
              </Button>
            </Box>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                setGoToLogin(true);
              }}
            >
              Login
            </Button>
          )}
           </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
