/* ---------- Autenticação JWT ---------- */
import { verify } from "jsonwebtoken";

const jwt = {
  secret: process.env.SECRET_KEY,
};
