const Story = require("../models/Story");
const StoryElement = require("../models/StoryElement");

const createStoryElement = async (req, res) => {
  try {
    const { name, type, role, status, description, notes, image, story } =
      req.body;

    if (!name || !type || !story) {
      return res.status(400).json({
        message: "Name, type, and story are required",
      });
    }

    const parentStory = await Story.findOne({
      _id: story,
      user: req.user.id,
    });

    if (!parentStory) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    const storyElement = await StoryElement.create({
      name,
      type,
      role,
      status,
      description,
      notes,
      image,
      story,
    });

    return res.status(201).json(storyElement);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create story element",
    });
  }
};

const getStoryElements = async (req, res) => {
  try {
    const parentStory = await Story.findOne({
      _id: req.params.storyId,
      user: req.user.id,
    });

    if (!parentStory) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    const storyElements = await StoryElement.find({
      story: parentStory._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(storyElements);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch story elements",
    });
  }
};

const getStoryElement = async (req, res) => {
  try {
    const storyElement = await StoryElement.findById(req.params.elementId);

    if (!storyElement) {
      return res.status(404).json({
        message: "Story element not found",
      });
    }

    const parentStory = await Story.findOne({
      _id: storyElement.story,
      user: req.user.id,
    });

    if (!parentStory) {
      return res.status(404).json({
        message: "Story element not found",
      });
    }

    return res.status(200).json(storyElement);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch story element",
    });
  }
};

module.exports = {
  createStoryElement,
  getStoryElements,
  getStoryElement,
};
