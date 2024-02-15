/** @format */

const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
  API: String,
  Description: String,
  Auth: String,
  HTTPS: String,
  Cors: String,
  Category: String,
});

const Crud = mongoose.model("Crud", crudSchema);
module.exports = Crud;
