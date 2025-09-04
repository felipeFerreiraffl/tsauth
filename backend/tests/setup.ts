/* ---------- 🧪 Setup do Jest ---------- */

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { MongoMemoryServer } from "mongodb-memory-server";

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MongoMemoryServer } = require("mongodb-memory-server");

dotenv.config();

let mongoServer: any;

beforeAll(async () => {
  // Cria um servidor em memória para testes
  mongoServer = await MongoMemoryServer.create();
  const mongouri = mongoServer.getUri();

  // Conexão ao servidor em memória
  await mongoose.connect(mongouri);
});

// Cada teste
afterEach(async () => {
  // Limpa as collections após cada teste
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Fechamento dos testes
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

// Configuração global
jest.setTimeout(30000);
