const app = require("../src/server");
const supertest = require("supertest");
const request = supertest(app);

jest.setTimeout(30000);

describe("Test users routes return", () => {
  it("should return all users property", async () => {
    const response = await request.get("/");

    console.log(response);
    expect(response.status).toBe(200);
    // expect(response.body.message).toBe({});
    // expect(users).toBe(true);
  });
});
