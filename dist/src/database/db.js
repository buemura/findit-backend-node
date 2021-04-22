"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var pg_1 = require("pg");
var isProduction = process.env.DB_ENVIRONMENT === "production";
var connectionString = "postgresql://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_DATABASE;
var pool = new pg_1.Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});
exports.default = pool;
