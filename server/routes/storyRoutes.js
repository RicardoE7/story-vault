const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const {
  createStory,
  getStories,
  getStory,
  updateStory,
  deleteStory,
} = require("../controllers/storyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", upload.single("image"), createStory);
router.get("/", getStories);
router.get("/:storyId", getStory);
router.put("/:storyId", upload.single("image"), updateStory);
router.delete("/:storyId", deleteStory);

module.exports = router;
