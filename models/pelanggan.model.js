const mongoose = require("mongoose");

const pelangganSchema = new mongoose.Schema({
  nama: { type: String },
  alamat: { type: String },
  hp: { type: String, unique: true },
});

module.exports = mongoose.model("pelanggan", pelangganSchema);
