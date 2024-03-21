require("dotenv").config();

const serverPort = process.env.PORT || 5000;
const mongodbURL = process.env.MONGODB_URL || "mongodb://localhost:27017/Rentaxo";

const storeId = process.env.STORE_ID;
const storePassword = process.env.STORE_PASSWORD;

module.exports = { serverPort, mongodbURL, storeId, storePassword };
