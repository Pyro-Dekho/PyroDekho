const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    price: Number,
    category: String, // indoor, outdoor, event, club, wedding, stage, birthday, fog, cracker
    image: String,

    technical: {
      availability: String,
      delivery: String,
      safety: String,
      spark: String,
      burnTime: String,
      sparkHeight: String,
      smoke: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
