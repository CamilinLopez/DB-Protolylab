require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, EXTERNAl_DATABASE_URL } =
  process.env;
const modelProject = require("./models/Projects");
const modelUser = require("./models/Users");

// const database = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   { logging: false, native: false }
// );

const database = new Sequelize(EXTERNAl_DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

modelProject(database);
modelUser(database);

module.exports = {
  ...database.models,
  database,
};
