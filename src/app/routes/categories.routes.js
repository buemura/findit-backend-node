const { Router } = require("express");
const CategoriesController = require("../controllers/CategoriesController");

const categories = Router();

categories.get("/api/categories", CategoriesController.showAllCategories);

module.exports = categories;
