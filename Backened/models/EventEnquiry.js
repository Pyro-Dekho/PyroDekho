const mongoose = require("mongoose");

const eventEnquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    eventType: {
      type: String,
      required: true,
      enum: [
        "Wedding",
        "Birthday",
        "Stage Show",
        "Corporate Event",
        "Club / DJ",
      ],
    },

    eventDate: {
      type: Date,
      required: true,
    },

    message: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "confirmed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventEnquiry", eventEnquirySchema);
