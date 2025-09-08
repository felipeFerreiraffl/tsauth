/* ---------- Contexto de autenticação ---------- */

import { createContext, useEffect, useState, type ReactNode } from "react";
import { API_URL, type AuthContextType, type LoginRequest, type User } from "../types";

// Criação de contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props do <Provider>
type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  // Estados para mudança de estado
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Verificação se o token está salvo
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      // Valida o token
      validateToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Valida o token do usuário
  const validateToken = async (token: string) => {
    try {
      // Pega a requisição do backend
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(token);
      } else {
        // Remove o token se a resposta não for
        localStorage.removeItem("token");
      }
    } catch (error: any) {
      console.error(`Erro ao validar token: ${error}`);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`)
    } catch (error) {
        
    }
  }
}
