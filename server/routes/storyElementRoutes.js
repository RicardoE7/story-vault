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

router.post("/", createStoryElement);
router.put("/:elementId", updateStoryElement);
router.delete("/:elementId", deleteStoryElement);
router.get("/story/:storyId", getStoryElements);
router.get("/:elementId", getStoryElement);

module.exports = router;
