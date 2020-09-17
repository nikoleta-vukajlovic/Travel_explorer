const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  evaluation: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const commentsModel = mongoose.model("comments", commentsSchema);

module.exports = commentsModel;
