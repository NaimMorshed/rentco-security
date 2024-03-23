require("dotenv").config();

const serverPort = process.env.PORT || 5000;
const mongodbURL = process.env.MONGODB_URL || "mongodb+srv://naim:naim@cluster0.gw0op.mongodb.net/Rentaxo?retryWrites=true&w=majority&appName=Cluster0";

const storeId = process.env.STORE_ID;
const storePassword = process.env.STORE_PASSWORD;

module.exports = { serverPort, mongodbURL, storeId, storePassword };
