const app = require("../src/server");
const jwt = require("jsonwebtoken");
const redis = require("../src/app/middlewares/handleBlacklist");
const { StatusCodes } = require("http-status-codes");
const supertest = require("supertest");
const request = supertest(app);

const user = {
  email: "bruno.uemura@gmail.com",
  password: "test",
};

let token, id;

beforeAll(async () => {
  token = await request
    .post("/api/auth/login")
    .send(user)
    .then(({ body }) => {
      return body.token;
    });

  id = jwt.decode(token).id;
});

afterAll(async () => {
  await redis.quit();
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe("Test users routes success return", () => {
  it("should return all users information", async () => {
    const response = await request.get("/api/users");

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body[0]).toHaveProperty("email");
  });

  it("should return one user information", async () => {
    const response = await request.get(`/api/users/${id}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty("email", "bruno.uemura@gmail.com");
  });

  it("should return users quantity", async () => {
    const response = await request.get("/api/users/all/count");

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toBeGreaterThanOrEqual(2);
  });

  it("should return user photo info", async () => {
    const response = await request.get(`/api/users/${id}/profile-image`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).not.toBe(null);
  });

  it("should return user updated successfully", async () => {
    const response = await request
      .put(`/api/users/${id}`)
      .set("Authorization", token);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe(`UPDATED user id ${id}`);
  });
});

describe("Test users routes return", () => {
  beforeAll(async () => {
    token = await request
      .post("/api/auth/login")
      .send(user)
      .then(({ body }) => {
        return body.token;
      });

    id = jwt.decode(token).id;
  });

  it("should return user not found in user photo route", async () => {
    const fakeId = "7f7cb4d1-1237-467c-8c24-fef6193f94b8";
    const response = await request.get(`/api/users/${fakeId}/profile-image`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.message).toBe("User not found.");
  });

  it("should return unauthorized in user update", async () => {
    const response = await request.put(`/api/users/${id}`);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).toBe("No JWT Token provided.");
  });

  it("should return user not found", async () => {
    const fakeId = "7f7cb4d1-1237-467c-8c24-fef6193f94b8";
    const response = await request
      .put(`/api/users/${fakeId}`)
      .set("Authorization", token);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe("User not found.");
  });
});
