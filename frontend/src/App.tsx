import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./services/routes/routes";
import AuthProvider from "./services/context";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
