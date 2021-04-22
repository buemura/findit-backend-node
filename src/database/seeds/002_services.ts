import Knex from "knex";

exports.seed = function (knex: Knex) {
  // Deletes ALL existing entries
  return knex("services")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("services").insert([
        {
          title: "Phone repair",
          category: "IT",
          description: "I am looking for someone that can repair my phone",
          price: "40",
          postal_code: "13056482",
        },
        {
          title: "Construction services",
          category: "Construction",
          description: "I am looking for someone that can build a house",
          price: "100",
          postal_code: "13056487",
        },
      ]);
    });
};
