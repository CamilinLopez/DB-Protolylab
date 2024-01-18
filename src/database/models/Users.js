const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  sequelize.define("users", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    emails: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    photos: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
};

module.exports = User;
