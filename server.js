require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 8000;
const app = express();

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
