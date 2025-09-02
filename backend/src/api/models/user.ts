/* ---------- Classes de modelo ---------- */

import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Montagem do esquema de modelo do MongoDB
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

// Hash para proteger a senha
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Refaz hash apenas se a senha for modificada

  try {
    // Gera um salt (objeto aleatório) de 12 dígitos
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Comparação de senha com o hash armazenado
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password); // Compara a senha armazenada com a senha
};

// Remoção da senha no JSON de resposta
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password; // Remoção da senha
  return userObject;
};

const User = mongoose.model("User", userSchema);

export default User;
