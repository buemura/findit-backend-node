"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Portfolios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Portfolios.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  Portfolios.init(
    {
      user_id: DataTypes.UUID,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Portfolios",
    }
  );
  Portfolios.beforeCreate((portfolio) => (portfolio.id = uuidv4()));
  return Portfolios;
};
