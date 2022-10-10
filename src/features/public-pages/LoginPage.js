import { useSignInEmailPassword } from "@nhost/react";
import { Link, Navigate, useOutletContext } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import InputAdornment from "@mui/material/InputAdornment";

export const LoginPage = () => {
  const { appName } = useOutletContext();
  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error
  } = useSignInEmailPassword();

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const uname = form.getAll("email").shift();
    const passw = form.getAll("password").shift();

    await signInEmailPassword(uname, passw, {
      redirectTo: window.location.origin
    });
  };

  if (isSuccess) {
    return <Navigate to="/" replace />;
  }

  if (needsEmailVerification) {
    return (
      <Alert severity="warning">
        <AlertTitle>Pending Verification!</AlertTitle>
        Please verify your email by clicking on the activation code that you
        received.
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Login <small>- {appName}</small>
      </Typography>
      <Divider />

      {isError && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error.message}
        </Alert>
      )}

      <Stack sx={{ mt: 2 }} spacing={2}>
        <TextField
          type="text"
          name="email"
          placeholder="email"
          disabled={isLoading}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
        />
        <TextField
          type="password"
          name="password"
          disabled={isLoading}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            )
          }}
        />
        <Button type="submit" disabled={isLoading} variant="contained">
          Login
        </Button>
        <Button
          disabled={isLoading}
          variant="link"
          component={Link}
          to="/signup"
        >
          Create Account
        </Button>
      </Stack>
    </Box>
  );
};
