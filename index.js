require("dotenv").config();

const server = require("./src/app");
const { PORT, DATABASE_FORCE } = process.env;
const { database } = require("./src/database/db");

database.sync({ force: false }).then(async () => {
  console.log(`you are connected to ${database.getDatabaseName()} database`);
  console.log(`database force: ${DATABASE_FORCE}`);

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
