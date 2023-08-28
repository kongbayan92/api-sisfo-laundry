require("dotenv").config();
require("./config/database")();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/users", require("./controllers/user.controller"));
app.use("/pelanggan", require("./controllers/pelanggan.controller"));
app.use("/barang", require("./controllers/barang.controller"));
app.use("/terima", require("./controllers/terima.controller"));

module.exports = app;
