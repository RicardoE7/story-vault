const express = require("express");
const {
  createStoryElement,
  getStoryElements,
  getStoryElement,
  updateStoryElement,
  deleteStoryElement,
} = require("../controllers/storyElementController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/:storyId/elements", createStoryElement);
router.get("/:storyId/elements", getStoryElements);
router.get("/:storyId/elements/:elementId", getStoryElement);
router.put("/:storyId/elements/:elementId", updateStoryElement);
router.delete("/:storyId/elements/:elementId", deleteStoryElement);

module.exports = router;
