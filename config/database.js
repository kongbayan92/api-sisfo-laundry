const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

const configDB = {
  useNewUrlParser: true,
};

const database = () => {
  // connectiong to the database
  mongoose
    .connect(MONGO_URI, configDB)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

module.exports = database;
