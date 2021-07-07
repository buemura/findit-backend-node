const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const auth = Router();

// ROUTES
auth.post("/api/auth/register", AuthController.registerUser);
auth.post("/api/auth/login", AuthController.loginUser);
auth.post("/api/auth/logout", AuthController.logoutUser);

module.exports = auth;
