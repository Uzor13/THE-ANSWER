const mongoose = require("mongoose");

const fixturesSchema = mongoose.Schema({
  venue: String,
  date: String,
  time: String,
  hometeam: String,
  awayteam: String,
  hometeamScore: Number,
  awayteamScore: Number,
  hometeamLogo: String,
  awayteamLogo: String
});

const fixturesModel = mongoose.model("fixtures", fixturesSchema);

module.exports = {
  fixturesModel,
};
