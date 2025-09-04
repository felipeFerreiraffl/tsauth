/* ---------- 🧪 Teste de autenticação ---------- */

// import request from "supertest";
// import app from "../src/app.js";

const request = require("supertest");
const app = require("../src/app");

describe("Auth Routes", () => {
  // Usuário de teste
  const userTest = {
    username: "teste123",
    email: "teste@email.com",
    password: "123456",
  };

  // Teste de cadastro
  describe("POST /api/auth/register", () => {
    // Teste de sucesso de cadastro
    it("should return a new user successfully", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send(userTest)
        .expect(200);

      expect(response.body).toHaveProperty("user");
      expect(response.body).toHaveProperty("token");
      expect(response.body.user.email).toBe(userTest.email);
    });

    // Teste de erro de email duplicado
    it("should return an error for duplicate email", async () => {
      // Primeiro cadastro
      await request(app).post("/api/auth/register").send(userTest);

      // Segunddo cadastro
      const response = await request(app)
        .post("/api/auth/register")
        .send(userTest)
        .expect(400);

      // Retorna o erro
      expect(response.body).toHaveProperty("error", true);
    });

    // Teste de erro de email duplicado
    it("should return an error for invalid email", async () => {
      // Usuário com email inválido
      const invalidEmail = { ...userTest, email: "invalidEmail" };

      // Cadastro do usuário inválido
      const response = await request(app)
        .post("/api/auth/register")
        .send(invalidEmail)
        .expect(400);

      // Retorna o erro
      expect(response.body).toHaveProperty("error", true);
    });
  });

  // Teste de login
  describe("POST /api/auth/login", () => {
    // Cadastra o usuário primeiro
    beforeEach(async () => {
      await request(app).post("/api/auth/register").send(userTest);
    });

    // Retorna o suuário corretamente
    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: userTest.email, password: userTest.password })
        .expect(200);

      expect(response.body).toHaveProperty("user");
      expect(response.body).toHaveProperty("token");
      expect(response.body.user.email).toBe(userTest.email);
    });

    // Retorna um erro por credenciais inválidas
    it("should return an error for invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: userTest.email, password: "invalidPassowrd" })
        .expect(401);

      expect(response.body).toHaveProperty("error", true);
    });

    // Retorna um erro pelo usuário não corresponder ao banco de dados
    it("should return an error for non-existent user", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "nonexistent@email.com", password: userTest.password })
        .expect(401);

      expect(response.body).toHaveProperty("error", true);
    });
  });
});
