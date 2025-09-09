/* ---------- Contexto de autenticação ---------- */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { API_URL, type AuthContextType, type User } from "../types";

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
      const response = await fetch(`${API_URL}/users/me`, {
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

  // Função de login de usuário
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Define o usuário logado
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        return true;
      }

      return false;
    } catch (error: any) {
      console.log(`Login failed: ${error}`);
      return false;
    }
  };

  // Função de cadastro do usuário
  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        return true;
      }

      return false;
    } catch (error: any) {
      console.error(`Register failed: ${error}`);
      return false;
    }
  };

  // Logout do usuário
  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para utilizar o contexto de Auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
