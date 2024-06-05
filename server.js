require("dotenv").config();
const express = require("express");
// const cors = require("cors");

const {
  errorResponseHandler,
  invalidPathHandler,
} = require("./middleware/errorHandler");

const userRoutes = require("./routes/userRoutes");

const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 8000;
const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running.");
});

// app.use(errorResponseHandler);
// app.use(invalidPathHandler);
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
