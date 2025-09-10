import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../services/context";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Caso o usuário não estiver autenticado, ele volta a página inicial
  if (!user) {
    return <Navigate to={"/"} />;
  }

  // Renderiza o componente caso esteja autenticado
  return <>{children}</>;
}
