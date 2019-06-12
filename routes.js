const express = require("express");
const fs = require("fs");
const xlsx = require("node-xlsx").default;
const User = require("./model");

const routes = express.Router();

routes.get("/", async (req, res) => {
  // Parse a buffer
  const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`teste.xlsx`));

  for (let item = 1; item < workSheetsFromBuffer[0].data.length; item++) {
    const [nome, idade, sexo] = workSheetsFromBuffer[0].data[item];
    const obj = {
      nome,
      idade,
      sexo
    };
    await User.create(obj);
  }

  res.send(workSheetsFromBuffer[0].data);
});

module.exports = routes;
