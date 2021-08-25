const Category = require("../schemas/categories");
const seed = require("./categories.json");
const mongoose = require("mongoose");
require("dotenv").config();

const seedCategory = async () => {
  const categories = seed.CategorySeed;
  const categoriesToAdd = [];

  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Category.remove();

    for (let i = 0; i < categories.length; i++) {
      categoriesToAdd.push({
        category: categories[i].category,
        categoryPhoto: categories[i].categoryPhoto,
        createdAt: new Date(),
      });
    }

    Category.create(categoriesToAdd);
  } catch (error) {
    console.log(error);
  }
};

seedCategory();