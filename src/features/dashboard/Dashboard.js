import { useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { useDefaultProject } from "./use-default-project";

export const Dashboard = () => {
  const { uname, userId } = useOutletContext();
  const { data, error } = useDefaultProject(userId);

  return (
    <Box m={3}>
      <Typography>{`Welcome ${uname}`}</Typography>
      {error && <Alert severity="error">{error.message}</Alert>}
      {data && <Typography>Project: {data.title}</Typography>}
    </Box>
  );
};
