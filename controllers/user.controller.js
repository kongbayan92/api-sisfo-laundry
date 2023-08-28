const express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const userController = express.Router();

userController.post("/register", async (req, res) => {
  // Periksa apakah data lengkap?
  if (!(req.body.nama && req.body.email && req.body.password)) {
    return res.status(400).json({ message: "Data harus lengkap." });
  }

  // Periksa apakah user sudah terdaftar?
  let userAda = await userModel.findOne({ email: req.body.email });
  if (userAda) {
    return res.status(400).json({ message: "User telah terdaftar." });
  }

  // Enkripsi password user
  const passwordEncrypted = await bcrypt.hash(password, 10);

  // Create user in our database
  const newUser = await userModel.create({
    nama,
    email,
    password: passwordEncrypted,
  });

  // Create JWT Token
  const token = jwt.sign(
    {
      email,
      userId: newUser._id,
    },
    process.env.TOKEN_KEY,
    { expiresIn: "140h" }
  );

  return res.status(201).json({ token });
});

userController.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "Semua data harus diisi" });
  }

  // validasi jika user ada di dalam database
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create JWT Token
    const token = jwt.sign(
      {
        email,
        userId: user._id,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "140h" }
    );

    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Kredensial tidak valid." });
});

module.exports = userController;
