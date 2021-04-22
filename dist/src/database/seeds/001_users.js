"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(function () {
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
