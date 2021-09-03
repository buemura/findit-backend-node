import { Router } from "express";
import { CategoriesController } from "../controllers/CategoriesController";

const categories = Router();

categories.get("/api/categories", CategoriesController.showAllCategories);

export { categories };
