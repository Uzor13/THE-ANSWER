const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  name: { type: String },
  logo: String,
});

const teamModel = mongoose.model("team", teamSchema);

module.exports = {
  teamModel,
};
