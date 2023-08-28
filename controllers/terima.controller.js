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

module.exports = terimaController;
