/* ---------- Controladores de usuários ---------- */

import type { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.js";
import { setSuccessStatus } from "../middlewares/statusHandler.js";
import User from "../models/user.js";
import type { CustomError } from "../../utils/customError.js";

export class UserController {
  // GET /users
  static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await UserService.getAllUsers();

      setSuccessStatus(200, res).json({ users });
    } catch (error) {
      next(error); // errorHandler()
    }
  }

  // GET /users/me -> apenas o usuário do ID pode ver seus dados
  static async getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
      const user = await UserService.getUserById(userId);

      setSuccessStatus(200, res).json({ user });
    } catch (error) {
      next(error);
    }
  }

  // GET /users/me -> apenas o usuário do ID pode ver seus dados
  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);

      setSuccessStatus(200, res).json({ user });
    } catch (error) {
      next(error);
    }
  }
}
