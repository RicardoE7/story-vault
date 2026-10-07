require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const storyRoutes = require("./routes/storyRoutes");
const storyElementRoutes = require("./routes/storyElementRoutes");
const upload = require("./middleware/uploadMiddleware");
const uploadToCloudinary = require("./utils/uploadToCloudinary");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());

app.use("/api/users", authRoutes);

app.use("/api/stories", storyRoutes);

app.use("/api/stories", storyElementRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Story Vault API is running" });
});

app.listen(PORT, () => {
  console.log(`Story Vault API running on port ${PORT}`);
});
