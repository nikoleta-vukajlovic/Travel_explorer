const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  wishList: [String]
});

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
