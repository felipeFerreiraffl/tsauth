/* ---------- 👥 Controladores de usuários ---------- */

import type { NextFunction, Request, Response } from "express";
import { setSuccessStatus } from "../middlewares/statusHandler";
import { UserService } from "../services/user";

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
      const role = req.user?.role;
      const user = await UserService.getUserById(userId, userId, role);

      setSuccessStatus(200, res).json({ user });
    } catch (error) {
      next(error);
    }
  }

  // GET /users/:id -> apenas o usuário do ID pode ver seus dados ou o admin pode ver dados de outros usuários
  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const userId = req.user?.userId;
      const role = req.user?.role;
      const user = await UserService.getUserById(id, userId, role);

      console.log("Usuário: ", {
        id,
        userId,
        role,
        reqUser: req.user,
      });

      setSuccessStatus(200, res).json({ user });
    } catch (error) {
      next(error);
    }
  }

  // PUT /users/:id
  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
    } catch (error: any) {}
  }
}
