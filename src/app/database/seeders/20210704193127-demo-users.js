"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const password = "test";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          name: "Bruno Uemura",
          email: "bruno.uemura@gmail.com",
          password: await bcrypt.hash(password, 10),
          city: "Campinas",
          state: "São Paulo",
          country: "Brazil",
          phone: "+55 19 99999-9999",
          occupation: "Software Engineer",
          about_me: "I am a Software Engineer",
          email_verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "José Lacerda",
          email: "jose.lacerda@gmail.com",
          password: await bcrypt.hash(password, 10),
          city: "Sumare",
          state: "São Paulo",
          country: "Brazil",
          phone: "+55 19 98888-8888",
          occupation: "Software Developer",
          about_me: "I am a Software Developer",
          email_verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Linus Torvalds",
          email: "linus.torvalds@gmail.com",
          password: await bcrypt.hash(password, 10),
          city: "Helsinki",
          state: "SF",
          country: "Finland",
          phone: "+55 19 97777-7777",
          occupation: "Software Engineer",
          about_me: "I am the creator of Linux Operating System",
          email_verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Bill Gates",
          email: "bill.gates@gmail.com",
          password: await bcrypt.hash(password, 10),
          city: "Seattle",
          state: "Washington, D.C.",
          country: "USA",
          phone: "+55 19 96666-6666",
          occupation: "CEO at Microsoft",
          about_me: "I am the CEO of Microsoft",
          email_verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Elon Musk",
          email: "elon.musk@gmail.com",
          password: await bcrypt.hash(password, 10),
          city: "Pretoria",
          state: "Gauteng",
          country: "South Africa",
          phone: "+55 19 96666-6666",
          occupation: "CEO at Tesla",
          about_me: "I am the CEO of Tesla",
          email_verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Mark Zuckerberg",
          email: "mark.zuckerberg@gmail.com",
          password: await bcrypt.hash(password, 10),
          city: "White Plains",
          state: "New York",
          country: "USA",
          phone: "+55 19 95555-5555",
          occupation: "CEO at Facebook",
          about_me: "I am the founder of Facebook",
          email_verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
