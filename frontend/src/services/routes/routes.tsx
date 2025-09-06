/* ---------- Rotas ---------- */

import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/Home";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route element={<Home />} path="/" />
    </Routes>
  );
}
