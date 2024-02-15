/** @format */

const route = require("express").Router();
const { Insert, Delete, Update, GetData } = require("../controller/crudCtrlr");
route.post("/", Insert);
route.delete("/:id", Delete);
route.patch("/:id", Update);
route.get("/", GetData);
module.exports = route;
