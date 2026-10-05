const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Story Vault API is running" });
});

app.listen(PORT, () => {
  console.log(`Story Vault API running on port ${PORT}`);
});