const express = require('express');
const { connectMongoDB } = require("./config/db-config");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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
