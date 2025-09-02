/* ---------- Controladores de usuários ---------- */

import type { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.js";
import { setSuccessStatus } from "../middlewares/statusHandler.js";

export class UserController {
  // GET /users
  static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await UserService.getAllUsers();

      setSuccessStatus(200, res, "Got users sucessfully").json({ users });
    } catch (error) {
      next(error); // errorHandler()
    }
  }
}
