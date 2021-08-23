const { Router } = require("express");
const auth = require("./auth.routes");
const users = require("./users.routes");
const services = require("./services.routes");
const chat = require("./chat.routes");
const comments = require("./comments.routes");
const categories = require("./categories.routes");

const routes = Router();

// ROUTES
routes.get("/", (_, res) => {
  res.send({ message: "You are in the backend API" });
});

routes.use(auth, users, services, chat, comments, categories);

module.exports = routes;
