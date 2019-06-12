const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");

const routes = express.Router();

routes.get("/", (req, res) => {
  var buf = fs.readFileSync("teste.xlsx");
  var wb = XLSX.read(buf, { raw: true });

  var first_sheet_name = wb.SheetNames[0];

  var worksheet = wb.Sheets[first_sheet_name];

  let arr = [];

  for (const item in worksheet) {
    if (!/^!/.test(item)) arr.push(worksheet[item].v);
  }

  let header = arr.slice(0, 3);
  let content = arr.slice(3);
  let locals = [];
  let inc = [];

  for (let i = 0; i < content.length; i++) {
    inc.push(content[i]);
    if ((i + 1) % 3 === 0) {
      locals.push(inc);
      inc = [];
    }
  }
  const result = { header, locals };

  res.send(result);
});

module.exports = routes;
