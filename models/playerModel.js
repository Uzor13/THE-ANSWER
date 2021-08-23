const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: String,
  playerNumber: Number,
  age: String,
  gender: String,
  height: String,
  hometown: String,
  team: String,
  img: String,
});

const playerModel = mongoose.model("player", playerSchema);

module.exports = {
  playerModel,
};
