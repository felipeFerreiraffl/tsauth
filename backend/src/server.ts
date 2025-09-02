/* ---------- Servidor ---------- */

import dotenv from "dotenv";
import "dotenv/config";
import app from "./app.js";
import dbConnection from "./config/db.js";

// Configuração do .env
dotenv.config();

const PORT = process.env.PORT! || 8000;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
