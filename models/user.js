const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  otp: Number,
  pdfContent: String, 
});

module.exports = mongoose.model("User", userSchema);
