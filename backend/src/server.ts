/* ---------- 🖥️ Servidor ---------- */

import dotenv from "dotenv";
import "dotenv/config";
import app from "./app";
import dbConnection from "./config/db";

// Configuração do .env
dotenv.config();

const PORT = process.env.PORT! || 8000;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
