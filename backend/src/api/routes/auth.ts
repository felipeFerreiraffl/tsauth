/* ---------- 🔒 Rotas de autenticação ---------- */

import { Router } from "express";
import { AuthController } from "../controllers/auth.js";

const authRouter = Router();

// /api/auth/login
authRouter.post("/login", AuthController.login);

// /api/auth/register
authRouter.post("/register", AuthController.register);

export default authRouter;
