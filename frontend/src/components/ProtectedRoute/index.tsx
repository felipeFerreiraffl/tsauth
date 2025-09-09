import type { ReactNode } from "react";
import { useAuth } from "../../services/context";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return alert("Carregando...");
  }

  // Caso o usuário não estiver autenticado, ele volta a página inicial
  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  // Renderiza o componente caso esteja autenticado
  return <>{children}</>;
}
