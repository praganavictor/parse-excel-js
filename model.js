const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nome: String,
  idade: Number,
  sexo: String
});

module.exports = mongoose.model("User", userSchema);
