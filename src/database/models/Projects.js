const { DataTypes } = require("sequelize");

const Project = (sequelize) =>
  sequelize.define("projects", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    texto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkimagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idimage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = Project;
