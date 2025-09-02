/* ---------- Classes de modelo ---------- */

import mongoose, { Schema } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
}

// Montagem do esquema de modelo do MongoDB
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
