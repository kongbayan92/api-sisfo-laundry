const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema({
  nama: { type: String },
});

module.exports = mongoose.model("barang", barangSchema);
