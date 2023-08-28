const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const pelangganModel = require("../models/pelanggan.model");
const pelangganController = express.Router();

pelangganController.post(
  "/",
  [authMiddleware.verifyToken],
  async (req, res) => {
    if (!(req.body.nama && req.body.alamat && req.body.hp)) {
      return res
        .status(400)
        .json({ message: "Data pelanggan harus diisi lengkap" });
    }

    const pelangganAda = await pelangganModel.findOne({ hp: req.body.hp });
    if (pelangganAda) {
      return res.status(400).json({ message: "Pelanggan sudah pernah dibuat" });
    }

    const pelangganBaru = await pelangganModel.create(req.body);
    return res.status(201).json(pelangganBaru);
  }
);

pelangganController.get("/", authMiddleware.verifyToken, async (req, res) => {
  const daftarPelanggan = await pelangganModel.find();
  return res.status(200).json(daftarPelanggan);
});

pelangganController.get(
  "/:id",
  authMiddleware.verifyToken,
  async (req, res) => {
    const pelanggan = await pelangganModel.findOne({
      _id: req.params.id,
    });

    return res.status(200).json(pelanggan);
  }
);

pelangganController.put(
  "/:id",
  authMiddleware.verifyToken,
  async (req, res) => {
    const pelanggan = await pelangganModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    return res.status(200).json(pelanggan);
  }
);

pelangganController.delete(
  "/:id",
  authMiddleware.verifyToken,
  async (req, res) => {
    await pelangganModel.findOneAndRemove({
      _id: req.params.id,
    });
    return res.status(204).json(null);
  }
);

module.exports = pelangganController;
