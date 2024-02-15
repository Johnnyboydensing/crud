/** @format */

const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const crudRoute = require("./routes/crudRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", crudRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log("The serve is running and the database is connected...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
