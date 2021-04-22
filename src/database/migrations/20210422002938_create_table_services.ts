import Knex from "knex";

exports.up = (knex: Knex) => {
  return knex.schema.createTable("services", (table) => {
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

exports.down = (knex: Knex) => {
  return knex.schema.dropTable("services");
};
