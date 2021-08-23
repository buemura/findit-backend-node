const CategoriesService = require("../services/CategoriesService");
const { StatusCodes } = require("http-status-codes");

class CategoriesController {
  static async showAllCategories(_, res) {
    const categoriesService = new CategoriesService();

    try {
      const categories = await categoriesService.showAllCategories();
      return res.json(categories);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = CategoriesController;
