const app = require("../src/server");
const supertest = require("supertest");
const request = supertest(app);

jest.setTimeout(30000);

const id = "f76aa4eb-db64-43e4-9d15-cec2aa1f9310";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3NmFhNGViLWRiNjQtNDNlNC05ZDE1LWNlYzJhYTFmOTMxMCIsImVtYWlsIjoiYnJ1bm8udWVtdXJhQGdtYWlsLmNvbSIsImlhdCI6MTYyNTY4ODUwMCwiZXhwIjoxNjI1NjkyMTAwfQ.dgph8nCdNf_go9sPvO70ZftwGKw4KJ-AYMHN5PoKKmg";

describe("Test users routes return", () => {
  it("should return all users information", async () => {
    const response = await request.get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("email");
  });

  it("should return one user information", async () => {
    const response = await request.get(`/api/users/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", "bruno.uemura@gmail.com");
  });

  it("should return users quantity", async () => {
    const response = await request.get("/api/users/all/count");

    expect(response.status).toBe(200);
    expect(response.body).toBeGreaterThanOrEqual(2);
  });

  it("should return user photo info", async () => {
    const response = await request.get(`/api/users/${id}/profile-image`);

    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
  });

  it("should return unauthorized in user update", async () => {
    const response = await request.put(`/api/users/${id}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No JWT Token provided.");
  });

  it("should return user updated successfully", async () => {
    const response = await request
      .put(`/api/users/${id}`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`UPDATED user id ${id}`);
  });
});
