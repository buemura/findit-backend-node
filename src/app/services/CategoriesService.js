const mongoose = require("mongoose");
const Category = require("../database/schemas/categories");

class CategoriesService {
  async showAllCategories() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return await Category.find();
  }
}

module.exports = CategoriesService;
