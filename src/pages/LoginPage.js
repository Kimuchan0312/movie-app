import { Button, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "../pages/LoginPage.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
const defaultValues = {
  username: "",
  password: "",
};

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    let from = location.state?.from?.pathname || "/";
    let { username, password } = data;

    auth.login(username, password, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="loginPage_background">
      <Typography
        variant="h3"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "flex" },
          fontFamily: "futura",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "white",
          textDecoration: "none",
          paddingTop: "10px",
          paddingLeft: "20px",
          objectFit: "contain",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        KIM
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          className="loginPage_container"
          spacing={3}
          sx={{ width: "350px", height: "450px", color: "white" }}
        >
          <Typography variant="h4" textAlign="center" sx={{ fontWeight: 700 }}>
            Login
          </Typography>

          <FTextField
            name="username"
            label="Username"
            sx={{ background: "white" }}
          />
          <FTextField name="password" label="Password" sx={{ backgroundColor: "white"}}type={showPassword ? 'text' : 'password'} InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    >
                        {showPassword ? <VisibilityOff/> : <Visibility /> }
                    </IconButton>
                </InputAdornment>
            )
         }}/>

          <Button
            className="loginPage_button"
            type="submit"
            variant="contained"
            sx={{ background: "red" }}
          >
            Login
          </Button>
          <div>
            <Button>Forgot Password?</Button>
            <Button>Don't have an account? Sign Up</Button>
          </div>
        </Stack>
      </FormProvider>
    </div>
  );
}

export default LoginPage;
