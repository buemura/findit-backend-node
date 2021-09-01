const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    userId: String,
    userPortfolios: [
      {
        photoUrl: String,
        photoDescription: String,
      },
    ],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
