import { useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Dashboard = () => {
  const { uname } = useOutletContext();
  return (
    <Box m={3}>
      <Typography>{`Welcome ${uname}`}</Typography>
    </Box>
  );
};
