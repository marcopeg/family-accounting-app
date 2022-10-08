import { useGetConfig } from "@forrestjs/react-root";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

export const PublicLayout = () => {
  const appName = useGetConfig("app.name");

  return (
    <Box sx={{ p: 4 }}>
      <Outlet context={{ appName }} />
    </Box>
  );
};
