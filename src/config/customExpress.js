const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routes = require("../app/routes");
const seedCategory = require("../app/database/mongoSeeds/categoriesSeeds");

module.exports = () => {
  const app = express();

  // middleware
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger("dev"));

  // routes
  app.use(routes);

  return app;
};
