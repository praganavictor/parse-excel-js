const express = require("express");
const path = require("path");
const fs = require("fs");
const xlsx = require("node-xlsx").default;
const User = require("./model");
const multer = require("multer");
const uploadConfig = require("./upload");

const routes = express.Router();

const upload = multer(uploadConfig);

routes.get("/", async (req, res) => {
  // Parse a buffer
  const sheets = xlsx.parse(fs.readFileSync(`teste.xlsx`));
  const data = sheets[0].data;

  for (let item = 1; item < data.length; item++) {
    const [nome, idade, sexo] = data[item];
    const obj = {
      nome,
      idade,
      sexo
    };
    await User.create(obj);
  }

  res.send(data);
});

routes.post("/", upload.single("excel"), async (req, res) => {
  const sheets = xlsx.parse(
    fs.readFileSync(
      path.resolve(__dirname, "files", `${req.file.originalname}`)
    )
  );
  const data = sheets[0].data;

  for (let item = 1; item < data.length; item++) {
    const [nome, idade, sexo] = data[item];
    const obj = {
      nome,
      idade,
      sexo
    };
    await User.create(obj);
  }
  res.json({ ok: true });
});

module.exports = routes;
