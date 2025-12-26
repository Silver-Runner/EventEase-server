const express = require('express');
const { connectMongoDB } = require("./config/db-config");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (
    origin &&
    (origin === "http://localhost:3000" ||
      origin === "http://localhost:5173" ||
      origin.endsWith(".vercel.app"))
  ) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Connect to MongoDB
connectMongoDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", require("./routes/users-route"));
app.use("/api/events",require("./routes/events-route"));
app.use("/api/payments",require("./routes/payment-route"));
app.use("/api/bookings", require("./routes/bookings-route"));
app.use("/api/reports", require("./routes/reports-route"));


app.listen(port, () => {
  console.log(`Node + Express server is running on port ${port}`);
});
