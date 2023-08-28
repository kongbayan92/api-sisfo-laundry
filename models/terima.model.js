const mongoose = require("mongoose");

const terimaSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
  },
  pelanggan: {
    nama: String,
    alamat: String,
    hp: String,
  },
  berat: {
    type: Number,
  },
  selesai: {
    type: Boolean,
    default: false,
  },
  diambil: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Number,
  },
  dibayar: {
    type: Number,
  },
  kembali: {
    type: Number,
  },
  barang: [{ nama: String, jumlah: Number }],
});

module.exports = mongoose.model("terima", terimaSchema);
