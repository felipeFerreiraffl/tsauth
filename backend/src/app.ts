/* ---------- Express ---------- */

import express from "express";
import {
  errorHandler,
  notFoundHandler,
} from "./api/middlewares/statusHandler.js";
import userRouter from "./api/routes/router.js";

// Instacia o express
const app = express();
app.use(express.json());

// Erros
app.use(errorHandler);
app.use(notFoundHandler);

// Rotas do usuário
app.use("/api/users", userRouter);

export default app;
