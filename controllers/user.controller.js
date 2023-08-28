const express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const userController = express.Router();

userController.post("/register", async (req, res) => {
  const { nama, email, password } = req.body;

  if (!(nama && password && email)) {
    return res.status(400).json({ message: "Semua data harus diisi" });
  }

  const member = await userModel.findOne({ email });

  if (member) {
    return res
      .status(400)
      .json({ message: "User sudah pernah mendaftar, silahkan sign in." });
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
