const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("type", {
    typeId: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING },
  });
};
