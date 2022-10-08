import { Outlet } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export const PublicLayout = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Outlet />
    </Box>
  );
};
