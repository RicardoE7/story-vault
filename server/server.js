const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.json({ message: "Story Vault API is running" });
});

app.listen(PORT, () => {
  console.log(`Story Vault API running on port ${PORT}`);
});
