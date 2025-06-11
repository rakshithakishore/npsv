const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    phone: String,
    dob: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
