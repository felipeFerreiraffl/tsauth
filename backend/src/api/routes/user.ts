/* ---------- Rotas de usuários ---------- */

import { Router } from "express";
import { UserController } from "../controllers/user.js";
import auth from "../middlewares/auth.js";

const userRouter = Router();

// GET /api/users
userRouter.get("/", auth, UserController.getAllUsers); // Auth para rota com token

export default userRouter;
