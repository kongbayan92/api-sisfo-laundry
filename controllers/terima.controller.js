const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const terimaModel = require("../models/terima.model");
const terimaController = express.Router();

terimaController.post("/", authMiddleware.verifyToken, async (req, res) => {
  const terima = await terimaModel.create(req.body);
  return res.status(201).json(terima);
});

terimaController.get("/", authMiddleware.verifyToken, async (req, res) => {
  const daftarTerima = await terimaModel.find();
  return res.status(200).json(daftarTerima);
});

terimaController.get("/:id", authMiddleware.verifyToken, async (req, res) => {
  const terima = await terimaModel.findOne({ _id: req.params.id });
  return res.status(200).json(terima);
});

terimaController.post(
  "/:id/selesai",
  authMiddleware.verifyToken,
  async (req, res) => {
    let terima = await terimaModel.findOneAndUpdate(
      { _id: req.params.id },
      { selesai: true },
      { new: true }
    );

    return res.status(200).json(terima);
  }
);

terimaController.post(
  "/:id/diambil",
  authMiddleware.verifyToken,
  async (req, res) => {
    let terima = await terimaModel.findOne({ _id: req.params.id });

    if (terima && !terima.selesai) {
      return res
        .status(400)
        .json({ message: "Anda belum menyelesaikan cucian" });
    }

    terima = await terimaModel.findOneAndUpdate(
      { _id: req.params.id },
      { diambil: true },
      { new: true }
    );

    return res.status(200).json(terima);
  }
);

module.exports = terimaController;
