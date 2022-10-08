import { Link, Navigate } from "react-router-dom";
import { useSignUpEmailPassword } from "@nhost/react";

import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";

export const SignupPage = () => {
  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error
  } = useSignUpEmailPassword();

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const uname = form.getAll("email").shift();
    const passw = (Math.random() + 1).toString(36).substring(1);

    await signUpEmailPassword(uname, passw);
  };

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  if (needsEmailVerification) {
    return (
      <Alert severity="success">
        <AlertTitle>Account Created!</AlertTitle>
        Please verify your email by clicking on the activation code that you
        received.
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Create New Account <small>- Family Economy App</small>
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
        <Button type="submit" disabled={isLoading} variant="contained">
          Create Account
        </Button>
        <Button
          disabled={isLoading}
          variant="link"
          component={Link}
          to="/login"
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
};
