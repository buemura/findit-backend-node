const database = require("../database/models");

async function checkUserExists(id) {
  const userExists = await database.Users.findOne({ where: { id } });

  if (!userExists) {
    throw new NotFound("User");
  }

  return userExists;
}

class PortfolioService {
  async showAllUsersPortfolios() {
    return await database.Portfolios.findAll();
  }

  async showUserPortfolios(id) {
    return await database.Portfolios.findAll({ where: { user_id: id } });
  }

  async getPortfolioImages(id) {
    const portfolio = await database.Portfolios.findAll({
      where: { id },
    });

    return portfolio[0].dataValues.image;
  }

  async uploadPortfolioImages(files, user_id) {
    await checkUserExists(user_id);

    files.forEach(async ({ filename }) => {
      await database.Portfolios.create(
        { user_id, image: filename },
        { where: { user_id } }
      );
    });

    return { message: `UPDATED user id ${user_id} portfolio added` };
  }
}

module.exports = PortfolioService;
