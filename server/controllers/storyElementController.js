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

const updateStoryElement = async (req, res) => {
  try {
    const { name, type, role, status, description, notes, image } = req.body;

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

    storyElement.name = name ?? storyElement.name;
    storyElement.type = type ?? storyElement.type;
    storyElement.role = role ?? storyElement.role;
    storyElement.status = status ?? storyElement.status;
    storyElement.description = description ?? storyElement.description;
    storyElement.notes = notes ?? storyElement.notes;
    storyElement.image = image ?? storyElement.image;

    await storyElement.save();

    return res.status(200).json(storyElement);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update story element",
    });
  }
};

const deleteStoryElement = async (req, res) => {
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

    await storyElement.deleteOne();

    return res.status(200).json({
      message: "Story element deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete story element",
    });
  }
};

module.exports = {
  createStoryElement,
  getStoryElements,
  getStoryElement,
  updateStoryElement,
  deleteStoryElement,
};
