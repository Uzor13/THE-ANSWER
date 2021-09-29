const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  email: {type: String, unique:true},
  firstName: { type: String },
  lastName: String,
  playerNumber: Number,
  age: Number,
  gender: String,
  height: String,
  hometown: String,
  img: String, 
});

const playerModel = mongoose.model("player", playerSchema);

module.exports = {
  playerModel,
};
