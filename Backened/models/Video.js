const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    type: String, // home, event, cracker
    videoUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
