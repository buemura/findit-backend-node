const app = require("../src/server");
const supertest = require("supertest");
const redis = require("../src/app/middlewares/handleBlacklist");
const { StatusCodes } = require("http-status-codes");
const request = supertest(app);

afterAll(async () => {
  await redis.quit();
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe("Test authentication routes return", () => {
  it("should return registration success", async () => {
    const user = {
      name: "test",
      email: "test.test@gmail.com",
      password: "test",
    };

    const response = await request.post("/api/auth/register").send(user);

    if (response.status === StatusCodes.OK) {
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("User registered successfully!");
    }

    if (response.status === StatusCodes.BAD_REQUEST) {
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe("User already registered!");
    }
  });

  it("should return registration failed, user already registered", async () => {
    const user = {
      name: "Bruno Uemura",
      email: "bruno.uemura@gmail.com",
      password: "test",
    };

    const response = await request.post("/api/auth/register").send(user);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe("User already registered!");
  });

  it("should return registration failed, missing name", async () => {
    const user = {
      email: "bruno.uemura@gmail.com",
      password: "test",
    };

    const response = await request.post("/api/auth/register").send(user);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(
      "Missing name field on the request body!"
    );
  });

  it("should return login success", async () => {
    const user = {
      email: "bruno.uemura@gmail.com",
      password: "test",
    };

    const response = await request.post("/api/auth/login").send(user);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.auth).toBe(true);
    expect(response.body.message).toBe("Authentication Successful");
    expect(response.body).toHaveProperty("token");
  });

  it("should return logout success", async () => {
    const user = {
      email: "bruno.uemura@gmail.com",
      password: "test",
    };

    const { token } = await request
      .post("/api/auth/login")
      .send(user)
      .then(({ body }) => {
        return body;
      });

    const response = await request.post("/api/auth/logout").send({ token });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.auth).toBe(true);
    expect(response.body.message).toBe("Signed out successfully");
  });
});
