const Story = require("../models/Story");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/uploadToCloudinary");

const createStory = async (req, res) => {
  try {
    const { title, description, genre, status } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Story title is required",
      });
    }

    let image;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
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
    const { title, description, genre, status } = req.body;

    const story = await Story.findOne({
      _id: req.params.storyId,
      user: req.user.id,
    });

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    if (title !== undefined) {
      story.title = title;
    }

    if (description !== undefined) {
      story.description = description;
    }

    if (genre !== undefined) {
      story.genre = genre;
    }

    if (status !== undefined) {
      story.status = status;
    }

    if (req.file) {
      const oldPublicId = story.image?.publicId;

      const result = await uploadToCloudinary(req.file.buffer);

      story.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };

      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }
    }

    await story.save();

    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update story",
    });
  }
};

const deleteStory = async (req, res) => {
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

    const publicId = story.image?.publicId;

    if (publicId) {
      await deleteFromCloudinary(publicId);
    }

    await story.deleteOne();

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
