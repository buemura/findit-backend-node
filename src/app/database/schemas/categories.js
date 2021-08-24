const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category: String,
  categoryPhoto: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
