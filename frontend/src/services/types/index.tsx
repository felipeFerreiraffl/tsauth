/* ---------- Interfaces espelhadas do Backend ---------- */

// URL geral
export const API_URL = "http://localhost:8080/api";

// Usuário
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}

// Requisição de login
export interface LoginRequest {
  email: string;
  password: string;
}

// Resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Tipagem para o contexto
export interface AuthContextType {
  user: User | null;
  token: string | null;
  logout: () => void;
  loading: boolean;
}
