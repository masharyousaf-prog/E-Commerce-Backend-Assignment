import { jest } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import AppDataSource from "../config/data-source.js";

describe("POST /users Integration Test", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterEach(async () => {
    const userRepository = AppDataSource.getRepository("User");
    await userRepository.clear(); 
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  test("should successfully create a new user and store it in the database", async () => {
    const userData = {
      name: "Ashar",
      email: "ashar@example.com",
      password: "123"
    };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
    expect(response.body.user.email).toBe(userData.email);

    const userRepository = AppDataSource.getRepository("User");
    const userInDb = await userRepository.findOneBy({ email: userData.email });
    
    expect(userInDb).not.toBeNull();
    expect(userInDb.name).toBe(userData.name);
  });
});