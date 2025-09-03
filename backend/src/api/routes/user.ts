/* ---------- Rotas de usuários ---------- */

import { Router } from "express";
import { UserController } from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import { requireAdmin, requireOwnerOrAdmin } from "../middlewares/authRole.js";

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

export default userRouter;
