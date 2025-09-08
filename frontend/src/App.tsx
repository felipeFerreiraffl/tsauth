import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./services/routes/routes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
