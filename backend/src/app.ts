/* ---------- 📱 Express ---------- */

import express from "express";
import {
  errorHandler,
  notFoundHandler,
} from "./api/middlewares/statusHandler.js";
import userRouter from "./api/routes/user.js";
import authRouter from "./api/routes/auth.js";

// Instacia o express
const app = express();
app.use(express.json());

// Rotas de autenticação
app.use("/api/auth", authRouter);

// Rotas do usuário
app.use("/api/users", userRouter);

// Erros
app.use(errorHandler);
app.use(notFoundHandler);


export default app;
