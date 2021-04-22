import Knex from "knex";

exports.seed = function (knex: Knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Elon Musk",
          email: "elon.musk@gmail.com",
          password: "teste",
        },
      ]);
    });
};
