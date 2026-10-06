const express = require("express");
const {
  createStoryElement,
  getStoryElements,
  getStoryElement,
} = require("../controllers/storyElementController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createStoryElement);
router.get("/story/:storyId", getStoryElements);
router.get("/:elementId", getStoryElement);

module.exports = router;
