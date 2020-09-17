const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

const agencyModel = mongoose.model("agency", agencySchema);

module.exports = agencyModel;
