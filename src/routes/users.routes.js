const { Router } = require("express");
const UsersController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const multerConfig = require("../config/multer");

const users = Router();

// ROUTES
users.get("/api/users", UsersController.showAllUsers);
users.get("/api/users/:id", UsersController.showOneUser);
users.get("/api/users/all/count", UsersController.showUsersQuantity);
users.get("/api/users/:id/profile-image", UsersController.getProfileImage);
users.post(
  "/api/users/:id/profile-image/upload",
  authMiddleware,
  multer(multerConfig).single("file"),
  UsersController.uploadProfileImage
);
users.put("/api/users/:id", authMiddleware, UsersController.updateUser);
users.delete("/api/users/:id", authMiddleware, UsersController.deleteUser);

module.exports = users;
