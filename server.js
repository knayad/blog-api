require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
