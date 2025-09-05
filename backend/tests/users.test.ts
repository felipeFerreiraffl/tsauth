/* ---------- 🧪 Teste de usuários ---------- */

import request from "supertest";
import app from "../src/app";
import User from "../src/api/models/user";

describe("User Routes", () => {
  let authToken: string;
  let userId: string;

  // Usuário de teste
  const testUser = {
    username: "name",
    email: "test@email.com",
    password: "123456",
  };

  const adminUser = {
    username: "admin",
    email: "admin@email.com",
    password: "123456",
    role: "admin",
  };

  beforeEach(async () => {
    // Registro e login de usuário
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    authToken = registerResponse.body.token;
    userId = registerResponse.body.user._id;
  });

  // Teste de busca de informações do próprio usuário
  describe("GET /api/users/me", () => {
    // Retorna usuário, caso o token seja válido
    it("should get current user with valid token", async () => {
      const response = await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty("_id", userId);
      expect(response.body.user).toHaveProperty("username", testUser.username);
      expect(response.body.user).toHaveProperty("email", testUser.email);
      expect(response.body.user).toHaveProperty("role", "user");
      expect(response.body.user).toHaveProperty("createdAt");
      expect(response.body.user).toHaveProperty("updatedAt");

      expect(response.body.user).not.toHaveProperty("password");
    });

    // Retorna um erro de token inexistente
    it("should return 401 and error message without token", async () => {
      const response = await request(app).get("/api/users/me").expect(401);

      expect(response.body).toHaveProperty("error", true);
    });

    // Retorna um erro de token inválido
    it("should return error with invalid token", async () => {
      const response = await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer invalidToken`)
        .expect(401);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 401);
    });

    // Retorna erro ao colocar um token de forma errada (sem Bearer)
    it("should return error for incorrect authorization format", async () => {
      const response = await request(app)
        .get("/api/users/me")
        .set("Authorization", authToken) // Sem Bearer
        .expect(401);

      expect(response.body).toHaveProperty("error", true);
    });
  });

  // Teste de busca de informações de um usuário
  describe("GET /api/users/:id", () => {
    // Retorna o usuário pelo ID como administrador ou dono do usuário
    it("should get user by ID as owner", async () => {
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("user");
      expect(response.body.user._id).toBe(userId);
    });

    // Retorna um erro por um usuário tentar acessar ID de um usuário sem ser administrador
    it("should return a forbidden when acessing other user without admin role", async () => {
      const otherUserResponse = await request(app)
        .post("/api/auth/register")
        .send({
          username: "normal user",
          email: "normal@email.com",
          password: "123456",
        });

      const otherUser = otherUserResponse.body.user;
      expect(otherUser).toBeDefined();
      const otherUserId = otherUser._id;

      const response = await request(app)
        .get(`/api/users/${otherUserId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(403);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 403);
    });

    // Retorna erro caso o usuário não exista
    it("should return error for non-existent user", async () => {
      const adminResponse = await request(app)
        .post("/api/auth/register")
        .send(adminUser);
      const adminToken = adminResponse.body.token;

      const nonExistentId = "507f1f77bcf86cd799439011";

      const response = await request(app)
        .get(`/api/users/${nonExistentId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 404);
    });

    it("should return error for invalid ID format", async () => {
      const invalidId = "invalidId";

      const response = await request(app)
        .get(`/api/users/${invalidId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(403);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 403);
    });
  });

  // Teste de busca de todos os usuários
  describe("GET /api/users", () => {
    // Retorna erro de tentar acessar rota sem ser admin
    it("should return a forbidden for non-admins", async () => {
      const response = await request(app)
        .get(`/api/users`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(403);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 403);
    });

    // Retorna todos os usuários (como admin)
    it("should return all users as admin", async () => {
      const adminResponse = await request(app)
        .post("/api/auth/register")
        .send(adminUser);

      const adminToken = adminResponse.body.token;

      const response = await request(app)
        .get(`/api/users`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("users");
      expect(Array.isArray(response.body.users)).toBe(true);
    });
  });

  // Teste de atualização do usuário
  describe("PUT /api/users/:id", () => {
    // Retorna o usuário pelo ID como administrador ou dono do usuário
    it("should update user by ID as owner with valid data", async () => {
      const updatedData = {
        username: "updated user",
        email: "updated@email.com",
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedData)
        .expect(200);

      console.log(response.body);
      expect(response.body).toHaveProperty(
        "message",
        "User updated successfully"
      );
      expect(response.body).toHaveProperty("user");
      expect(response.body.user.username).toBe(updatedData.username);
      expect(response.body.user.email).toBe(updatedData.email);
    });

    // Autoriza admin atualizar qualquer usuário
    it("should allow admin to update any user", async () => {
      const adminResponse = await request(app)
        .post("/api/auth/register")
        .send(adminUser);

      const adminToken = adminResponse.body.token;

      const updatedData = {
        username: "updated by admin",
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "User updated successfully"
      );
      expect(response.body.user.username).toBe(updatedData.username);
    });

    // Retorna um erro por um usuário tentar atualizar outro usuário sem ser administrador
    it("should return a forbidden when acessing other user without admin role", async () => {
      const otherUserResponse = await request(app)
        .post("/api/auth/register")
        .send({
          username: "normal user",
          email: "normal@email.com",
          password: "123456",
        });

      const otherUser = otherUserResponse.body.user;
      expect(otherUser).toBeDefined();
      const otherUserId = otherUser._id;

      const updatedData = {
        username: "trying to update user",
      };

      const response = await request(app)
        .put(`/api/users/${otherUserId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedData)
        .expect(403);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 403);
    });

    // Retorna erro ao não enviar nenhum dado para atualizar
    it("should return error when not provided data for update", async () => {
      const response = await request(app)
        .put(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty("error", true);
    });

    // Retorna erro ao colocar um ID inválido
    it("should return error for invalid user ID", async () => {
      const invalidId = "invalidId";
      const updatedData = {
        username: "updated user",
      };

      const response = await request(app)
        .put(`/api/users/${invalidId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedData)
        .expect(403);

      expect(response.body).toHaveProperty("error", true);
    });

    // Retorna erro ao colocar ID de usuário não existente
    it("should return error for non-existent user", async () => {
      const adminResponse = await request(app)
        .post("/api/auth/register")
        .send(adminUser);
      const adminToken = adminResponse.body.token;

      const nonExistentId = "507f1f77bcf86cd799439011";
      const updatedData = {
        username: "updated user",
      };

      const response = await request(app)
        .put(`/api/users/${nonExistentId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updatedData)
        .expect(404);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 404);
    });

    // Não permite um usuário alterar seu próprio role
    it("should not allow user to update their role", async () => {
      const updatedData = {
        username: "updated user",
        role: "admin",
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.user.role).not.toBe("admin");
      expect(response.body.user.role).toBe("user"); // Mantém o role original
    });
  });

  // Teste de exclusão de um usuário
  describe("DELETE /api/users/:id", () => {
    it("should delete user as its owner", async () => {
      // Deleta um usuário e verifica se foi excluído
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "User deleted successfully"
      );

      // Verificação se usuário foi deletado de fato
      const verifyResponse = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404);

      expect(verifyResponse.body).toHaveProperty("error", true);
    });

    // Retorna erro para usuários não encontrados
    it("should allow admin to delete users", async () => {
      const adminResponse = await request(app)
        .post("/api/auth/register")
        .send(adminUser);
      const adminToken = adminResponse.body.token;

      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "User deleted successfully"
      );
    });

    // Retorna um erro ao outro usuário tentar deletar outro usuário sem ser admin
    it("should return a forbidden when deleting other user without admin role", async () => {
      const otherUserResponse = await request(app)
        .post("/api/auth/register")
        .send({
          username: "normal user",
          email: "normal@email.com",
          password: "123456",
        });

      const otherUser = otherUserResponse.body.user;
      expect(otherUser).toBeDefined();
      const otherUserId = otherUser._id;

      const response = await request(app)
        .delete(`/api/users/${otherUserId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(403);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 403);
    });

    // Retorna um erro ao tentar deletar um usuário que não existe no banco
    it("should return an error for non-existent user", async () => {
      const adminResponse = await request(app)
        .post("/api/auth/register")
        .send(adminUser);
      const adminToken = adminResponse.body.token;

      const nonExistentId = "507f1f77bcf86cd799439011";

      const response = await request(app)
        .delete(`/api/users/${nonExistentId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(404);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 404);
    });

    // Retorna um erro ao tentar deletar usuário com ID inválido
    it("should return an error for invalid user ID", async () => {
      const invalidId = "invalidId";

      const response = await request(app)
        .delete(`/api/users/${invalidId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(403);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body).toHaveProperty("status", 403);
    });
  });

  // Erros
  describe("Error Handlers", () => {
    // Retorna erro 404 por rota inexistente
    it("should return 404 for non-existent route", async () => {
      const response = await request(app)
        .get("/api/non-existent-route")
        .expect(404);

      expect(response.body).toHaveProperty("error", true);
      expect(response.body.status).toBe(404);
    });
  });
});
