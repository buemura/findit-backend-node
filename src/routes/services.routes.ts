import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ServicesController } from "../controllers/ServicesController";

const services = Router();

services
  .get("/api/services", ServicesController.showAllServices)
  .get("/api/services/:id", ServicesController.showOneService)
  .get("/api/services/all/count", ServicesController.showServicesQuantity)
  .get("/api/services/user/:id", ServicesController.showServicesFromUser)
  // .get(
  //   "/api/services/all/categories",
  //   ServicesController.showServicesCategories
  // )
  .post("/api/services", authMiddleware, ServicesController.createService)
  .put("/api/services/:id", authMiddleware, ServicesController.updateService)
  .delete(
    "/api/services/:id",
    authMiddleware,
    ServicesController.deleteService
  );

export { services };
