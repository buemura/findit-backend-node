import Knex from "knex";

exports.up = (knex: Knex) => {
  return knex.schema.createTable("phones", (table) => {
    table.increments("id");
    table.integer("user_id").notNullable().references("id").inTable("users");
    table.text("phone");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable("phones");
};
