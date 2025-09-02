/* ---------- Serviços ---------- */

import type { Document } from "mongoose";
import User from "../models/user.js";
import type { CustomError } from "../../utils/customError.js";

// @Service
// Não conhece Express, apenas repassa informações do Mongo
export class UserService {
  // Busca todos os usuários
  static async getAllUsers(): Promise<Document[]> {
    try {
      const users = await User.find();

      // Verificação se o array é vazio ou existe
      if (!users || users.length === 0) {
        const error: CustomError = new Error("Not found any user");
        error.status = 404;
        throw error;
      }

      return users;
    } catch (error: any) {
      // Caso seja um erro do MongoDB, lançar um CustomError
      if (error.name === "MongoError" || error.name === "MongooseError") {
        const customError: CustomError = new Error("Error in Mongo database");
        customError.status = 500;
        throw customError;
      }

      // Lança o erro normal (errorHandler())
      throw error;
    }
  }
}
