const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const barangModel = require("../models/barang.model");
const barangController = express.Router();

barangController.post("/", authMiddleware.verifyToken, async (req, res) => {
  if (!req.body.nama) {
    return res.status(400).json({ message: "Nama wajib diisi" });
  }

  const barang = await barangModel.create(req.body);
  return res.status(201).json(barang);
});

barangController.get("/", authMiddleware.verifyToken, async (req, res) => {
  const daftarBarang = await barangModel.find();
  return res.status(200).json(daftarBarang);
});

barangController.get("/:id", authMiddleware.verifyToken, async (req, res) => {
  const barang = await barangModel.findOne({ _id: req.params.id });
  return res.status(200).json(barang);
});

barangController.put("/:id", authMiddleware.verifyToken, async (req, res) => {
  if (!req.body.nama) {
    return res.status(400).json({ message: "Nama wajib diisi" });
  }

  const barang = await barangModel.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );

  return res.status(200).json(barang);
});

barangController.delete(
  "/:id",
  authMiddleware.verifyToken,
  async (req, res) => {
    await barangModel.findByIdAndDelete({ _id: req.params.id });
    return res.status(204).json(null);
  }
);

module.exports = barangController;
