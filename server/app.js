const express = require("express");
const { urlencoded, json } = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors'); 
const app = express();
app.use(cors());

const databaseString = "mongodb://localhost:27017/travel";
mongoose.connect(databaseString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", function() {
  console.log("Uspesno povezivanje!");
});

mongoose.connection.on("error", error => {
  console.log("Greska: ", error);
});

app.use(json());
app.use(urlencoded({ extended: false }));

const usersRoutes = require("./routes/api/usersRoutes");
app.use("/api/usersRoutes", usersRoutes);

app.use(function(req, res, next) {
  const error = new Error("Zahtev nije podrzan!");
  error.status = 405;
  next(error);
});

app.use(function(error, req, res, next) {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    error: {
      message: error.message,
      status: statusCode,
      stack: error.stack
    }
  });
});

module.exports = app;
