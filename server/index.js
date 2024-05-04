const { serverPort } = require("./secret");
const connectDB = require("./config/db");
const express = require("express");
const helmet = require('helmet');
const nodemailer = require("nodemailer");
const rateLimit = require('express-rate-limit');
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

// Use Helmet middleware
app.use(helmet());

// Set Content Security Policy (CSP) headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow resources from the same origin
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.example.com'], // Allow scripts from the same origin and specific CDN
      styleSrc: ["'self'", 'https://fonts.googleapis.com'], // Allow stylesheets from the same origin and Google Fonts
      fontSrc: ["'self'", 'https://fonts.gstatic.com'], // Allow fonts from the same origin and Google Fonts
      imgSrc: ["'self'", 'data:'], // Allow images from the same origin and data URIs
      objectSrc: ["'none'"], // Disallow plugins like Flash
      upgradeInsecureRequests: [], // Upgrade HTTP requests to HTTPS
    },
  })
);

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

app.use(limiter);

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

const emailVerification = () => {
  // Function to generate OTP code
  const generateOTP = () => {
    // Generate a 6-digit OTP code
    return Math.floor(100000 + Math.random() * 900000);
  };

  // Function to send OTP code via email
  const sendOTPByEmail = async (email, otp) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nmorshed191208@bscse.uiu.ac.bd",
        pass: "",
      },
    });

    // Email content
    const mailOptions = {
      from: "nmorshed191208@bscse.uiu.ac.bd",
      to: email,
      subject: "Verification OTP",
      text: `Your OTP code is: ${otp}`,
    };

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };

  // Usage example
  const email = "morshed.naim13@gmail.com";
  const otp = generateOTP();

  sendOTPByEmail(email, otp)
    .then((success) => {
      if (success) {
        console.log("OTP sent successfully!");
      } else {
        console.log("Failed to send OTP.");
      }
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
    });
};

connectDB().then(() => {
  app.listen(serverPort, () => {
    console.log(`Server running at http://localhost:${serverPort}`);
    // emailVerification();
  });
});
