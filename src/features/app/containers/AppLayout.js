import { Outlet } from "react-router-dom";
import { useUserId, useSignOut } from "@nhost/react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import LogoutIcon from "@mui/icons-material/Logout";

import { gql, useQuery } from "@apollo/client";

const GET_USER_QUERY = gql`
  query GetUser($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
      metadata
      avatarUrl
    }
  }
`;

export const AppLayout = () => {
  const { signOut } = useSignOut();

  const userId = useUserId();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id: userId },
    skip: !userId
  });

  if (loading) {
    return null;
  }

  const uname = data?.user.email.split("@").shift;

  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pegoreale
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton color="inherit" size="large" onClick={signOut}>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      {error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : !loading ? (
        <Outlet context={{ userId, uname }} />
      ) : null}
    </>
  );
};
