const mongoose = require("mongoose");

const storyElementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["CHARACTER", "LOCATION", "EVENT", "FACTION", "ITEM"],
      required: true,
    },
    role: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    image: {
      url: {
        type: String,
        trim: true,
      },
      publicId: {
        type: String,
        trim: true,
      },
    },
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const StoryElement = mongoose.model("StoryElement", storyElementSchema);

module.exports = StoryElement;
