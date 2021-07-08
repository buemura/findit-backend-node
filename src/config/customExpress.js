const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routes = require("../app/routes");

module.exports = () => {
  const app = express();

  // middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger("dev"));

  // routes
  app.use(routes);

  return app;
};
