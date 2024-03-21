const { serverPort } = require("./secret");
const connectDB = require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");

const defaultRouter = require("./routes/default.routes");
const userRouter = require("./routes/users.routes");
const apartmentRouter = require("./routes/apartments.routes");
const propertyRouter = require("./routes/property.routes");
const documentsRoutes = require("./routes/document.routes");
const paymentRoutes = require("./routes/payment.routes");
const notFoundRouter = require("./routes/notFound.routes");
const flatRequestRoutes = require("./routes/flatRequest.routes");
const complainRoutes = require("./routes/complain.routes");
const chainingRoutes = require("./routes/chaining.routes");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/", defaultRouter);
app.use("/users", userRouter);
app.use("/apartments", apartmentRouter);
app.use("/property", propertyRouter);
app.use("/documents", documentsRoutes);
app.use("/payment", paymentRoutes);
app.use("/flatRequest", flatRequestRoutes);
app.use("/chaining", chainingRoutes);
app.use("/complain", complainRoutes);
app.use(notFoundRouter);

connectDB().then(() => {
  app.listen(serverPort, () => {
    console.log(`Server running at http://localhost:${serverPort}`);
  });
});
