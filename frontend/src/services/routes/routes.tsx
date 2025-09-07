/* ---------- Rotas ---------- */

import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../../pages/Login";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route element={<Login />} path="/" />
    </Routes>
  );
}
