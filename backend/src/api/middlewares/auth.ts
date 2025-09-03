/* ---------- Autenticação JWT ---------- */

import type { NextFunction, Request, Response } from "express";
import pkg, { type JwtPayload } from "jsonwebtoken";
import type { CustomError } from "../../utils/customError.js";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

// Chave secreta do JWT
const jwt = {
  secret: process.env.SECRET_KEY as string,
};

// Configuração de autenticação por token
export default function auth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    if (!jwt.secret) {
      throw new Error("JWT Secret is missing in environment!");
    }

    // Extração do token do header
    const auth = req.headers.authorization;
    console.log(`Extracted Header: ${auth}`);

    if (!auth) {
      throw new Error("JWT missing!");
    }

    // Caso não utiliza a autenticação Bearer, lança um erro
    if (!auth.startsWith("Bearer ")) {
      const error: CustomError = new Error(
        "Invalid token format. Use: Bearer <token>"
      );
      error.status = 401;
      throw error;
    }

    // Extrai o token (remove o "Bearer " no index 7)
    const token = auth.substring(7).trim();
    console.log(`Token: ${token}`);

    // Caso o token não esteja presente, lança um erro
    if (!token) {
      const error: CustomError = new Error("Empty JWT token");
      error.status = 401;
      throw error;
    }

    // Decodificação e adiciona as informações à requisição do usuário
    const decoded = pkg.verify(token, jwt.secret);
    console.log(`Decoded token: ${decoded}`);
    req.user = decoded;

    next(); // Próximo middleware
  } catch (error: any) {
    // Mapeação do erro do JWT
    if (error.name === "TokenExpiredError") {
      const customError: CustomError = new Error(
        `Expired token: ${error.message}`
      );
      customError.status = 401;
      return next(customError);
    }

    if (error.name === "JsonWebTokenError") {
      const customError: CustomError = new Error(
        `Invalid token: ${error.message}`
      );
      customError.status = 401;
      return next(customError);
    }

    // Passa para outros erros (errorHandler())
    next(error);
  }
}
