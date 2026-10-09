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
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
  Boolean,
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);
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
