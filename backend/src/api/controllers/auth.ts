/* ---------- 🔒 Controladores de autenticação ---------- */

import type { NextFunction, Request, Response } from "express";
import { setSuccessStatus } from "../middlewares/statusHandler";
import { AuthService } from "../services/auth";

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

      setSuccessStatus(200, res).json({
        user,
        token,
      });

      // res.json({
      //   message: "Performed login successfully",
      //   user,
      //   token,
      // });
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

      res.json({
        message: "Performed login successfully",
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
