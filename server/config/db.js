const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

// database connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Database connected successfully...");

    // error connection
    mongoose.connection.on("error", (error) =>
      console.error("DB connection error: ", error)
    );
  } catch (error) {
    console.error("Error connecting to database!");
  }
};

module.exports = connectDB;
