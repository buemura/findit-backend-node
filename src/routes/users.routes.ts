import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UsersController } from "../controllers/UsersController";
// import { PortfolioController } from "../controllers/PortfolioController";
import multer from "multer";
import multerConfig from "../config/multer";

const users = Router();

users
  .get("/api/users", UsersController.showAllUsers)
  .get("/api/users/:id", UsersController.showOneUser)
  .get("/api/users/all/count", UsersController.showUsersQuantity)
  .get("/api/users/:id/profile-image", UsersController.getProfileImage)
  .post(
    "/api/users/:id/profile-image/upload",
    authMiddleware,
    multer(multerConfig).single("file"),
    UsersController.uploadProfileImage
  )
  .put("/api/users/:id", authMiddleware, UsersController.updateUser)
  .delete("/api/users/:id", authMiddleware, UsersController.deleteUser);

// // Portfolios
// users
//   .get("/api/users/all/portfolios", PortfolioController.showAllUsersPortfolios)
//   .get("/api/users/:id/portfolios", PortfolioController.showUserPortfolios)
//   .get(
//     "/api/users/:id/portfolios-image",
//     PortfolioController.getPortfolioImages
//   )
//   .get(
//     "/api/users/:id/portfolios-image/:image_id",
//     PortfolioController.getPortfolioImage
//   )
//   .post(
//     "/api/users/:id/portfolios/upload",
//     authMiddleware,
//     multer(multerConfig).array("file"),
//     PortfolioController.uploadPortfolioImages
//   );

export { users };
