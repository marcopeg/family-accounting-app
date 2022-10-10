import { useOutletContext, Navigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import { useDefaultProject } from "./use-default-project";

export const Dashboard = () => {
  const { userId } = useOutletContext();
  const { data, error } = useDefaultProject(userId);

  if (data) {
    return <Navigate to={`/project/${data.id}/add`} />;
  }

  return (
    <Box m={3}>{error && <Alert severity="error">{error.message}</Alert>}</Box>
  );
};
