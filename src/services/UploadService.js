const database = require("../models");

class UploadService {
  async uploadProfileImage(filename, id) {
    const userExists = await database.Users.findOne({ where: { id } });

    if (!userExists) {
      throw new Error("User does not exist!");
    }

    await database.Users.update({ user_photo: filename }, { where: { id } });
    return { message: `UPDATED user id ${id} profile photo` };
  }

  async getProfileImage(id) {
    const userExists = await database.Users.findOne({ where: { id } });

    if (!userExists) {
      throw new Error("User does not exist!");
    }

    const { user_photo } = userExists;

    return user_photo;
  }
}

module.exports = UploadService;
