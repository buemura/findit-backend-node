import { Router, Request, Response } from "express";
import UserLoginController from "../controllers/UserLoginController";
import UserController from "../controllers/UserController";
import ServiceController from "../controllers/ServiceController";

const router = Router();

const userLoginController = new UserLoginController();
const userController = new UserController();
const serviceController = new ServiceController();

// LOGIN & REGISTER
router.post("/api/register", userLoginController.userRegister);
router.post("/api/login", userLoginController.userLogin);

// ROUTES
router.get("/", (req: Request, res: Response) => {
  res.send({ message: "Voce está no backend da aplicação no heroku" });
});

router.get("/api/users", userController.getUsers);
router.get("/api/users/:id", userController.getUserById);
router.post("/api/users", userController.createUser);
router.put("/api/users/:id", userController.updateUser);
router.delete("/api/users/:id", userController.deleteUser);

router.get("/api/services", serviceController.getServices);
router.get("/api/services/:id", serviceController.getServiceById);
router.post("/api/services", serviceController.createService);
router.put("/api/services/:id", serviceController.updateService);
router.delete("/api/services/:id", serviceController.deleteService);

module.exports = router;
