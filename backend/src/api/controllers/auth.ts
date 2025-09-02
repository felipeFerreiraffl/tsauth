/* ---------- Controladores de autenticação ---------- */

import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.js";
import { setSuccessStatus } from "../middlewares/statusHandler.js";
import User from "../models/user.js";

export class AuthController {
  // GET /auth/login
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user, token } = await AuthService.login(
        req.body.email,
        req.body.password
      );

      setSuccessStatus(200, res, "Performed login successfully").json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /auth/register
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user, token } = await AuthService.register(req.body);

      setSuccessStatus(200, res, "Performed login successfully").json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
