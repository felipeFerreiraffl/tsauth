/* ---------- 🗝️ Payload personalizado para JWT ---------- */

import type { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string | undefined;
  username: string;
  email: string;
  role: "user" | "admin";
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload | undefined;
    }
  }
}
