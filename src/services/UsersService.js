const database = require("../models");

class UsersService {
  async showAllUsers() {
    return await database.Users.findAll();
  }

  async showOneUser(id) {
    return await database.Users.findOne({ where: { id: Number(id) } });
  }

  async showUsersQuantity() {
    const { count } = await database.Users.findAndCountAll();
    return count;
  }

  async updateUser(id, dataToUpdate) {
    const userExists = await database.Users.findOne({
      where: { id: Number(id) },
    });

    if (!userExists) {
      throw new Error("User does not exist!");
    }

    await database.Users.update(dataToUpdate, { where: { id: Number(id) } });

    return { message: `UPDATED user id ${id}` };
  }

  async deleteUser(id) {
    await database.Users.destroy({ where: { id: Number(id) } });
    return { message: `DELETED user id ${id}` };
  }
}

module.exports = UsersService;
