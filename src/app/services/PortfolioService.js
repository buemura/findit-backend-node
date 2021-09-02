const mongoose = require("mongoose");
const Portfolios = require("../database/schemas/Portfolios");

class PortfolioService {
  constructor() {
    mongoose.connect(process.env.MONGO_URL, {
      auth: {
        authSource: "admin",
      },
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async showAllUsersPortfolios() {
    return await Portfolios.find();
  }

  async showUserPortfolios(id) {
    return await Portfolios.find({ userId: id });
  }

  async getPortfolioImages(id) {
    const portfolio = await Portfolios.find({ userId: id });
    const result = [];

    portfolio.map((p) => {
      result.push(p.userPortfolios);
    });

    return result;
  }

  async getPortfolioImage(id, image_id) {
    const portfolio = await Portfolios.find(
      { userId: id },
      { userPortfolios: { $elemMatch: { _id: image_id } } }
    );

    return portfolio[0].userPortfolios[0].photoUrl;
  }

  async uploadPortfolioImages(userId, files) {
    const query = { userId };

    const portfolioExists = await Portfolios.find(query);

    if (portfolioExists.length === 0) {
      await Portfolios.create({ userId, userPhoto: [] });
    }

    files.forEach(async ({ filename }) => {
      const updateDocument = {
        $push: { userPortfolios: { photoUrl: filename, photoDescription: "" } },
      };

      await Portfolios.updateOne(query, updateDocument);
    });

    return { message: `UPDATED user id ${userId} portfolio added` };
  }
}

module.exports = PortfolioService;
