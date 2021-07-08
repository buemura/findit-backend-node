require("dotenv").config();
const db = require("../src/app/database/models");
const Sequelize = require("sequelize");

describe("Test database connectivity", () => {
  it("should return true on connectivity test", async () => {
    const dbConnectivity = await db.sequelize.authenticate().then(() => {
      return true;
    });

    expect(dbConnectivity).toBe(true);
  });

  it("should return false on connectivity test", async () => {
    const sequelize = new Sequelize(
      process.env.DEFAULT_DB,
      process.env.DB_USER,
      "test",
      {
        host: "localhost",
        dialect: process.env.DB_DIALECT,
      }
    );

    const dbConnectivity = await sequelize.authenticate().catch(() => {
      return false;
    });

    expect(dbConnectivity).toBe(false);
  });
});
