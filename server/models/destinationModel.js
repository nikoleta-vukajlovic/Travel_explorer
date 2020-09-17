const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  agency: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  departure: {
    type: String,
    required: true
  },
  arrival: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  links: {
    type: String,
    required: true
  },
  icons: {
    type: String,
    required: true
  },
  evaluation: {
    type: Number
  }
});

const destinationModel = mongoose.model("destination", destinationSchema);

module.exports = destinationModel;
