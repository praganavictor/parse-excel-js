const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(require("./routes"));

mongoose.connect("mongodb://localhost:27017/parseexcel", {
  useNewUrlParser: true
});

app.listen(3000);
