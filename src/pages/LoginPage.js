import React, { useState, useEffect } from "react";
import {
  Link,
  Stack,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { gapi } from "gapi-script";

const clientId =
  "290047459319-t8523l0f6k6331umo5qt5rr04eviacho.apps.googleusercontent.com";
const appId = "5131167370300501";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
        toast.success("Welcome to Innisfree!");
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const responseGoogle = async (response) => {
    try {
      await auth.googleLogin(response, () => {
        navigate("/", { replace: true });
        toast.success("Welcome to Innisfree!");
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  const responseFacebook = async (response) => {
    try {
      await auth.facebookLogin(response, () => {
        navigate("/", { replace: true });
        toast.success("Welcome to Innisfree!");
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography
        sx={{
          fontSize: "24px",
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "poppins",
        }}
      >
        LOGIN
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Don’t have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get started
            </Link>
          </Alert>

          <FTextField name="email" label="Email address" />

          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FCheckbox name="remember" label="Remember me" />
          <Link component={RouterLink} variant="subtitle2" to="/forgot">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>

      <Divider textAlign="center" sx={{ m: 2 }}>
        or login with
      </Divider>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with google"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <LoadingButton
              fullWidth
              size="large"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "12px",
                width: "49%",
                ":hover": { border: "solid 1px #d5d5d5" },
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
                border: "solid 1px",
              }}
              onClick={renderProps.onClick}
            >
              <img
                width={24}
                src="https://img.icons8.com/color/48/undefined/google-logo.png"
                alt="icon google"
              />
              <Typography sx={{ fontSize: "12px", ml: 1 }}>Google</Typography>
            </LoadingButton>
          )}
        />
        <FacebookLogin
          appId={appId}
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          render={(renderProps) => (
            <LoadingButton
              fullWidth
              size="large"
              sx={{
                backgroundColor: "#4267B2",
                color: "#fff",
                fontSize: "12px",
                width: "49%",
                ":hover": { bgcolor: "#003399" },
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
                border: "solid 1px #4267B2",
              }}
              onClick={renderProps.onClick}
            >
              <FacebookOutlinedIcon sx={{ mr: 1 }} />
              <Typography sx={{ fontSize: "12px" }}>Facebook</Typography>
            </LoadingButton>
          )}
        />
      </Stack>
    </Container>
  );
}

export default LoginPage;
