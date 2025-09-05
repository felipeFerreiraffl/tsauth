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
      const userData = req.body;
      const userId = req.user?.userId;
      const role = req.user?.role;

      const user = await UserService.updateUser(id, userData, userId, role);

      setSuccessStatus(200, res).json({
        message: "User updated successfully",
        user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  // DELETE /users/:id
  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const userId = req.user?.userId;
      const role = req.user?.role;

      await UserService.deleteUser(id, userId, role);

      setSuccessStatus(200, res).json({ message: "User deleted successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  // DELETE /users
  static async deleteAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const role = req.user?.role;

      await UserService.deleteAllUsers(role);

      setSuccessStatus(200, res).json({
        message: "All users deleted succesfully",
      });
    } catch (error: any) {
      next(error);
    }
  }
}
