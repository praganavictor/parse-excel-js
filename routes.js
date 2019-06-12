const express = require('express');
const XLSX = require('xlsx');
const fs = require('fs');

const routes = express.Router();

routes.get('/', (req, res) => {
  var buf = fs.readFileSync("teste.xlsx");
  var wb = XLSX.read(buf, {raw:true});
  
  var first_sheet_name = wb.SheetNames[0];

  var worksheet = wb.Sheets[first_sheet_name];


  for (const item in worksheet) {
    console.log(worksheet[item].v);
  }

  res.send(worksheet);
});

module.exports = routes;