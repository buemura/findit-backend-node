const database = require("../database/models");

class CategoriesService {
  async showAllCategories() {
    return await database.Categories.findAll();
  }
}

module.exports = CategoriesService;
