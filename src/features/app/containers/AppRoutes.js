import { Helmet } from "react-helmet";
import { Routes, Route, Outlet } from "react-router-dom";
import { useGetContext } from "@forrestjs/react-root";

import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "./AppLayout";
import { PublicLayout } from "./PublicLayout";

export const AppRoutes = () => {
  const { publicRoutes, protectedRoutes } = useGetContext("app");

  return (
    <>
      <Helmet>
        <title>Family Economy App</title>
      </Helmet>
      <Routes>
        {/* App Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {protectedRoutes.map((def, i) => (
            <Route {...def} key={i} />
          ))}
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          {publicRoutes.map((def, i) => (
            <Route {...def} key={i} />
          ))}
        </Route>
      </Routes>
    </>
  );
};
