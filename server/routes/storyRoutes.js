const express = require("express");
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

router.post("/", createStory);
router.get("/", getStories);
router.get("/:storyId", getStory);
router.put("/:storyId", updateStory);
router.delete("/:storyId", deleteStory);

module.exports = router;
