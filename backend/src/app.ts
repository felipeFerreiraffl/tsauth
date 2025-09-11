/* ---------- 📱 Express ---------- */

import express from "express";
import { errorHandler, notFoundHandler } from "./api/middlewares/statusHandler";
import userRouter from "./api/routes/user";
import authRouter from "./api/routes/auth";
import cors, { CorsOptions } from "cors";

// Instacia o express
const app = express();
app.use(express.json());

// Configuração do CORS
const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4173",
    "https://tsauth.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Rotas de autenticação
app.use("/api/auth", authRouter);

// Rotas do usuário
app.use("/api/users", userRouter);

// Erros
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
