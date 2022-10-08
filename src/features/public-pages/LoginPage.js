import { useSignInEmailPasswordless } from "@nhost/react";
import { Link, useOutletContext } from "react-router-dom";

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

export const LoginPage = () => {
  const { appName } = useOutletContext();
  const {
    signInEmailPasswordless,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error
  } = useSignInEmailPasswordless();

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const uname = form.getAll("email").shift();

    await signInEmailPasswordless(uname);
  };

  if (isSuccess) {
    return (
      <Alert severity="success">
        <AlertTitle>Login Succeeded!</AlertTitle>
        We sent you a <strong>Magic Link</strong> to your mailbox. <br />
        Click on it to login.
      </Alert>
    );
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
