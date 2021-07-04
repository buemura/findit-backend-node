"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }
  Users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      user_photo: DataTypes.STRING,
      location: DataTypes.STRING,
      phone: DataTypes.STRING,
      occupation: DataTypes.STRING,
      about_me: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  Users.beforeCreate((user) => (user.id = uuidv4()));
  return Users;
};
