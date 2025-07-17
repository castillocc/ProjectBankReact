import React from "react";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <>
      <PublicRoutes />
      <AdminRoutes />
    </>
  );
};

export default AppRoutes;
