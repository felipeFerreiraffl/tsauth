/* ---------- 🧪 Teste de usuários ---------- */

import request from "supertest";
import app from "../src/app";

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

  // Teste de busca de informações do usuário
  describe("GET /api/users/me", () => {
    // Retorna usuário, caso o token seja válido
    it("should get current user with valid token", async () => {
      const response = await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("user");
      expect(response.body.user.email).toBe(testUser.email);
    });

    // Retorna um erro de token inexistente
    it("should return error without token", async () => {
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
    });
  });

  describe("GET /api/users/:id", () => {
    // Retorna o usuário pelo ID como administrador
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
    });
  });

  describe("GET /api/users", () => {
    // Retorna erro de tentar acessar rota sem ser admin
    it("should return a forbidden for non-users", async () => {
      const response = await request(app)
        .get(`/api/users`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(403);

      expect(response.body).toHaveProperty("error", true);
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
