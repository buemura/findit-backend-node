"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable("phones", function (table) {
        table.increments("id");
        table.integer("user_id").notNullable().references("id").inTable("users");
        table.text("phone");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable("phones");
};
