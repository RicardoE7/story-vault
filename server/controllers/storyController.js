const Story = require("../models/Story");

const createStory = async (req, res) => {
  try {
    const { title, description, genre, status, image } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Story title is required",
      });
    }

    const story = await Story.create({
      title,
      description,
      genre,
      status,
      image,
      user: req.user.id,
    });

    return res.status(201).json(story);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create story",
    });
  }
};

const getStories = async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(stories);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch stories",
    });
  }
};

const getStory = async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.storyId,
      user: req.user.id,
    });

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch story",
    });
  }
};

const updateStory = async (req, res) => {
  try {
    const { title, description, genre, status, image } = req.body;

    const story = await Story.findOneAndUpdate(
      {
        _id: req.params.storyId,
        user: req.user.id,
      },
      {
        title,
        description,
        genre,
        status,
        image,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update story",
    });
  }
};

const deleteStory = async (req, res) => {
  try {
    const story = await Story.findOneAndDelete({
      _id: req.params.storyId,
      user: req.user.id,
    });

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    return res.status(200).json({
      message: "Story deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete story",
    });
  }
};

module.exports = {
  createStory,
  getStories,
  getStory,
  updateStory,
  deleteStory,
};
