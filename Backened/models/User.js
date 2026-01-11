const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {type:String,required:true},
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true},
  passwordHash: { type: String, required: true },

  // 🔐 FORGOT PASSWORD FIELDS
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
