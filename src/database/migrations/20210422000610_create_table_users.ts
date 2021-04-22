import Knex from "knex";

exports.up = (knex: Knex) => {
  return knex.schema.createTable("users", (table) => {
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

exports.down = (knex: Knex) => {
  return knex.schema.dropTable("users");
};
