const Player = require("../models/playerModel");
const Fixtures = require("../models/fixturesModel");

module.exports = {
  getAllPlayers: async (req, res) => {
    Player.playerModel.find({}, (err, foundData) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(foundData);
        //console.log(foundData);
      }
    });
  },

  getFixtures: async (req, res) => {
    Fixtures.fixturesModel.find({}, (err, foundData) => {
      if (err) {
        // console.log(err);
        res.status(500).send();
      } else {
        res.send(foundData);
        // console.log(foundData);
      }
    });
  },
};
