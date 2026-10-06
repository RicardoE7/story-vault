const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const storyRoutes = require("./routes/storyRoutes");
const storyElementRoutes = require("./routes/storyElementRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());

app.use("/api/users", authRoutes);

app.use("/api/stories", storyRoutes);

app.use("/api/story-elements", storyElementRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Story Vault API is running" });
});

app.listen(PORT, () => {
  console.log(`Story Vault API running on port ${PORT}`);
});
