/* ---------- 👥 Rotas de usuários ---------- */

import { Router } from "express";
import { UserController } from "../controllers/user";
import auth from "../middlewares/auth";
import { requireAdmin, requireOwnerOrAdmin } from "../middlewares/authRole";

const userRouter = Router();

// GET /api/users
// Apenas administrador
userRouter.get("/", auth, requireAdmin, UserController.getAllUsers);

// GET /api/users/me
// Qualquer usuário vê os seus dados
userRouter.get("/me", auth, UserController.getCurrentUser);

// GET /api/users/:id
// Apenas administrador ou próprio usuário
userRouter.get("/:id", auth, requireOwnerOrAdmin, UserController.getUserById);

// PUT /api/users/:id
// Apenas administrador ou próprio usuário
userRouter.put("/:id", auth, requireOwnerOrAdmin, UserController.updateUser);

// DELETE /api/users/:id
// Apenas administrador ou próprio usuário
userRouter.put("/:id", auth, requireOwnerOrAdmin, UserController.deleteUser);

// DELETE /api/users
// Apenas administrador
userRouter.put("/:id", auth, requireAdmin, UserController.deleteAllUsers);

export default userRouter;
