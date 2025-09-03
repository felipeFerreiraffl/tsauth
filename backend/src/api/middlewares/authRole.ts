/* ---------- Autorização de administrador ---------- */
import type { NextFunction, Request, Response } from "express";
import type { CustomError } from "../../utils/customError.js";

// Verifica se é administrador
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Busca a função do usuário
    const userRole = req.user?.role;

    // Caso não for administrador, negue o acesso
    if (userRole !== "admin") {
      const error: CustomError = new Error("Admin access required");
      error.status = 403;
      throw error;
    }

    next();
  } catch (error: any) {
    next(error);
  }
};

export const requireOwnerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const tokenId = req.user?.userId;
    const requiredUserId = req.params.id;
    const userRole = req.user?.role;

    // Permissão de acessar os dados caso seja admin ou seja o próprio usuário
    if (userRole === "admin" || tokenId === requiredUserId) {
      next();
    }

    // Por padrão, lança um erro de acesso
    const error: CustomError = new Error("Access denied");
    error.status = 403;
    throw error;
  } catch (error: any) {
    next(error);
  }
};
