import { useOutletContext } from "react-router-dom";

export const Dashboard = () => {
  const ctx = useOutletContext();
  console.log(ctx);
  return "Dashboard";
};
