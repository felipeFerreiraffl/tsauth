/* ---------- Serviço de autenticação ---------- */

import jwt from "jsonwebtoken";

import type { CustomError } from "../../utils/customError.js";
import User from "../models/user.js";

// Classe de autenticação de usuário
export class AuthService {
  // Cadastro do usuário
  static async register(userData: {
    username: string;
    email: string;
    password: string;
    role?: "user" | "admin";
  }) {
    try {
      const existingUser = await User.findOne({
        $or: [{ email: userData.email }, { username: userData.username }],
      });

      // Verifica se o usuário existe
      if (existingUser) {
        const error: CustomError = new Error(
          "Username ou email already exists"
        );
        error.status = 409;
        throw error;
      }

      // Cria o usuário sem a senha (com hash)
      const user = new User(userData);
      await user.save();

      // Gera JWT com dados não sensíveis
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          email: user.username,
          role: user.role,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: "7d" }
      );

      // Retorna usuário (sem senha) e JWT
      return { user: user.toJSON(), token };
    } catch (error: any) {
      throw error;
    }
  }

  // Login
  static async login(emailOrUsername: string, password: string) {
    try {
      if (!emailOrUsername || !password) {
        const error: CustomError = new Error(
          "Email/username and password are required"
        );
        error.status = 400;
        throw error;
      }

      // Busca por email ou username e inclui a senha
      const user = await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      }).select("+password");

      if (!user) {
        const error: CustomError = new Error("Invalid credentials");
        error.status = 401;
        throw error;
      }

      // Verifica se a senha é válida (compara com o hash)
      const isValidPassword = await user.comparePassword(password);

      if (!isValidPassword) {
        const error: CustomError = new Error("Invalid credentials");
        error.status = 401;
        throw error;
      }

      // Gera JWT com dados não sensíveis
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          email: user.username,
          role: user.role,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: "7d" }
      );

      // Retorna usuário (sem senha) e JWT
      return { user: user.toJSON(), token };
    } catch (error: any) {
      throw error;
    }
  }
}
