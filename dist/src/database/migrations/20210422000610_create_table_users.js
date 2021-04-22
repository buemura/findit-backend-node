"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable("users", function (table) {
        table.increments("id");
        table.text("name").notNullable();
        table.text("email").unique().notNullable();
        table.text("password").notNullable();
        table.text("address");
        table.text("postal_code");
        table.text("user_photo");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
