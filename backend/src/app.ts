/* ---------- 📱 Express ---------- */

import express from "express";
import { errorHandler, notFoundHandler } from "./api/middlewares/statusHandler";
import userRouter from "./api/routes/user";
import authRouter from "./api/routes/auth";

// Instacia o express
const app = express();
app.use(express.json());

// 

// Rotas de autenticação
app.use("/api/auth", authRouter);

// Rotas do usuário
app.use("/api/users", userRouter);

// Erros
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
