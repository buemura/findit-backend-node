"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var path_1 = __importDefault(require("path"));
module.exports = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            ssl: true,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: path_1.default.resolve(__dirname, "src", "database", "migrations"),
        },
        seeds: {
            directory: path_1.default.resolve(__dirname, "src", "database", "seeds"),
        },
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: path_1.default.resolve(__dirname, "src", "database", "migrations"),
        },
        seeds: {
            directory: path_1.default.resolve(__dirname, "src", "database", "seeds"),
        },
    },
};
