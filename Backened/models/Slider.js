const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  title: String,
  image: String,
});

module.exports = mongoose.model("Slider", sliderSchema);
