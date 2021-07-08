const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const auth = Router();

// ROUTES
auth.post("/api/auth/register", AuthController.registerUser);
auth.get(
  "/api/auth/email-confirmation/:id",
  AuthController.confirmRegistration
);
auth.post("/api/auth/login", AuthController.loginUser);
auth.post("/api/auth/logout", AuthController.logoutUser);

module.exports = auth;
