import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const auth = Router();

auth
  .post("/api/auth/register", AuthController.registerUser)
  .get("/api/auth/email-confirmation/:id", AuthController.confirmRegistration)
  .post("/api/auth/login", AuthController.loginUser)
  .post("/api/auth/logout", AuthController.logoutUser);

export { auth };
