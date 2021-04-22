"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable("services", function (table) {
        table.increments("id");
        table.text("title").notNullable();
        table.text("category").notNullable();
        table.text("description").notNullable();
        table.text("price").notNullable();
        table.text("postal_code").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable("services");
};
