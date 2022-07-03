const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: { type: DataTypes.FLOAT },
    attack: { type: DataTypes.INTEGER },
    defense: { type: DataTypes.INTEGER },
    speed: { type: DataTypes.INTEGER },
    height: { type: DataTypes.FLOAT },
    weight: { type: DataTypes.FLOAT },
    inDB: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  });
};
