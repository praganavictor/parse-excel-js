const express = require("express");
const fs = require("fs");
const xlsx = require("node-xlsx").default;

const routes = express.Router();

routes.get("/", (req, res) => {
  // Parse a buffer
  const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`teste.xlsx`));

  res.send(workSheetsFromBuffer);
});

module.exports = routes;
