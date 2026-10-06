const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  // Google OAuth
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },

  phone: {
    type: String,
    unique: true,
    sparse: true
  },

  address: {
    type: String,
    trim: true
  },

  // Required for normal signup,
  // not required for Google signup
  passwordHash: {
    type: String
  },

  // Forgot password
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);