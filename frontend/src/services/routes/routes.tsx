/* ---------- Rotas ---------- */

import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route element={<Login />} path="/" />
      <Route element={<SignUp />} path="/register" />
    </Routes>
  );
}
