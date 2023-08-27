const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nama: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});

module.exports = mongoose.model("user", userSchema);
