/* ---------- 👥 Service de usuários ---------- */

import type { Document } from "mongoose";
import User from "../models/user";
import type { CustomError } from "../../utils/customError";

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

  // Buscar usuário por ID
  static async getUserById(
    userId: string | undefined,
    requestUserId: string | undefined,
    requestUserRole: string | undefined
  ): Promise<Document> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        const error: CustomError = new Error("User not found");
        error.status = 404;
        throw error;
      }

      const userIdString = user._id.toString();
      const requestUserIdString = requestUserId?.toString();

      // Validação do usuário do ID ou admin
      const isOwner = userIdString === requestUserIdString;
      const isAdmin = requestUserRole === "admin";

      if (!isOwner && !isAdmin) {
        const error: CustomError = new Error("Access denied");
        error.status = 403;
        throw error;
      }

      return user;
    } catch (error: any) {
      if (error.name === "CastError") {
        const customError: CustomError = new Error(
          `Invalid user ID format: ${error.message}`
        );
        customError.status = 400;
        throw customError;
      }
      throw error;
    }
  }

  // Atualiza um usuário
  static async updateUser(
    targetId: string | undefined,
    updateData: any,
    requestUserId: string | undefined,
    requestUserRole: string | undefined
  ): Promise<Document> {
    try {
      // Verifica se o usuário existe
      const existingUser = await User.findById(targetId);

      // Verifica se o usuário a ser atualizado existe
      if (!existingUser) {
        const error: CustomError = new Error("User not found");
        error.status = 404;
        throw error;
      }

      const targetUserIdString = existingUser._id.toString();
      const requestUserIdString = requestUserId?.toString();

      // Validação do usuário do ID ou admin
      const isOwner = targetUserIdString === requestUserIdString;
      const isAdmin = requestUserRole === "admin";

      if (!isOwner && !isAdmin) {
        const error: CustomError = new Error("Access denied");
        error.status = 403;
        throw error;
      }

      // Validação dos dados de entrada
      if (!updateData || Object.keys(updateData).length === 0) {
        const error: CustomError = new Error("No data provided for update");
        error.status = 400;
        throw error;
      }

      const protectedInfos = ["_id", "__v", "createdAt"];
      protectedInfos.forEach((info) => delete updateData[info]);

      // Se não for admin, não pode alterar o role
      if (!isAdmin && updateData.role) {
        delete updateData.role;
      }

      // Atualização do usuário
      const updatedUser = await User.findByIdAndUpdate(targetId, updateData, {
        new: true, // Retorna o documento atualizado
        runValidators: true, // Validações do modelo
      });

      // Verifica se o usuário foi atualizado
      if (!updatedUser) {
        const error: CustomError = new Error("Failed to update user");
        error.status = 500;
        throw error;
      }

      return updatedUser;
    } catch (error: any) {
      // Erro de conversão de dados
      if (error.name === "CastError") {
        const customError: CustomError = new Error(
          `Invalid user ID format: ${error.message}`
        );
        customError.status = 400;
        throw customError;
      }

      // Erro de validação de dados
      if (error.name === "ValidationError") {
        const customError: CustomError = new Error(
          `Validation failed: ${error.message}`
        );
        customError.status = 400;
        throw customError;
      }

      // Erro de chave duplicada
      if (error.name === 11000) {
        const customError: CustomError = new Error("Email already exists");
        customError.status = 409;
        throw customError;
      }

      // Erro do servidor MongoDB
      if (error.name === "MongoError" || error.name === "MongooseError") {
        const customError: CustomError = new Error("Mongo database error");
        customError.status = 500;
        throw customError;
      }

      throw error;
    }
  }

  // Deletar todos os usuários
  static async deleteUser(
    userId: string | undefined,
    requestUserId: string | undefined,
    requestUserRole: string | undefined
  ): Promise<void> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        const error: CustomError = new Error("User not found");
        error.status = 404;
        throw error;
      }

      const userIdString = user._id.toString();
      const requestUserIdString = requestUserId?.toString();

      // Validação do usuário do ID ou admin
      const isOwner = userIdString === requestUserIdString;
      const isAdmin = requestUserRole === "admin";

      if (!isOwner && !isAdmin) {
        const error: CustomError = new Error("Access denied");
        error.status = 403;
        throw error;
      }

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        const error: CustomError = new Error("Failed to delete user");
        error.status = 500;
        throw error;
      }
    } catch (error: any) {
      // Erro de conversão de dados
      if (error.name === "CastError") {
        const customError: CustomError = new Error(
          `Invalid user ID format: ${error.message}`
        );
        customError.status = 400;
        throw customError;
      }

      // Erro do servidor MongoDB
      if (error.name === "MongoError" || error.name === "MongooseError") {
        const customError: CustomError = new Error("Mongo database error");
        customError.status = 500;
        throw customError;
      }

      throw error;
    }
  }

  // Deletar todos os usuários (apenas admin)
  static async deleteAllUsers(
    requestUserRole: string | undefined
  ): Promise<void> {
    try {
      const isAdmin = requestUserRole === "admin";

      if (!isAdmin) {
        const error: CustomError = new Error("Access denied");
        error.status = 403;
        throw error;
      }

      const deleteAll = await User.deleteMany({});

      if (!deleteAll) {
        const error: CustomError = new Error("Failed to delete all users");
        error.status = 500;
        throw error;
      }
    } catch (error: any) {
      // Erro do servidor MongoDB
      if (error.name === "MongoError" || error.name === "MongooseError") {
        const customError: CustomError = new Error("Mongo database error");
        customError.status = 500;
        throw customError;
      }

      throw error;
    }
  }
}
