require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const modelProject = require("./models/Projects");
const modelUser = require("./models/Users");

const database = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

modelProject(database);
modelUser(database);

module.exports = {
  ...database.models,
  database,
};
