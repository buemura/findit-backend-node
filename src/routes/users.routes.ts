import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UsersController } from "../controllers/UsersController";
import { PortfolioController } from "../controllers/PortfolioController";
import multer from "multer";
import { multerConfig } from "../config/multer";

export const users = Router();

users
  .get("/users", UsersController.showAllUsers)
  .get("/users/:id", UsersController.showOneUser)
  .get("/users/all/count", UsersController.showUsersQuantity)
  .get("/users/:id/profile-image", UsersController.getProfileImage)
  .post(
    "/users/:id/profile-image/upload",
    authMiddleware,
    multer(multerConfig).single("file"),
    UsersController.uploadProfileImage
  )
  .put("/users/:id", authMiddleware, UsersController.updateUser)
  .delete("/users/:id", authMiddleware, UsersController.deleteUser);

// Portfolios
users
  .get("/users/all/portfolios", PortfolioController.showAllUsersPortfolios)
  .get("/users/:id/portfolios", PortfolioController.showUserPortfolios)
  .get("/users/:id/portfolios-image", PortfolioController.getPortfolioImages)
  .get(
    "/users/:id/portfolios-image/:image_id",
    PortfolioController.getPortfolioImage
  )
  .post(
    "/users/:id/portfolios/upload",
    authMiddleware,
    multer(multerConfig).array("file"),
    PortfolioController.uploadPortfolioImages
  );
