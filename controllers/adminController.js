const Player = require("../models/playerModel");
const Team = require("../models/teamModel");
const Fixtures = require("../models/fixturesModel");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

module.exports = {
  // REGISTER ADMIN
  createAdmin: async (req, res) => {
    const admin = new Admin.adminModel();
    const { firstname, lastname, email, password } = req.body;

    admin.firstname = firstname;
    admin.lastname = lastname;
    admin.email = email;
    const suppliedPassword = password;

    // HASH PASSWORD
    try {
      admin.password = await bcrypt.hash(suppliedPassword, 10);
    } catch (error) {
      console.log("error", error);
    }

    admin.save((err, savedObject) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        console.log(savedObject);
        //res.redirect("/login");
        res.status(200).json({
          msg: "successfully created account",
        });
      }
    });
  },

  //LOGIN ADMIN
  loginAmin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const findUser = await Admin.adminModel.findOne({ email });

      if (!findUser) {
        return res.status(404).json({
          login: "false",
          message: "invalid username or password",
        });
      }
      const isMatch = await bcrypt.compare(password, findUser.password);

      if (isMatch) {
        req.session.isLoggedIn = true;
        req.session.user = findUser;
        req.session.save();
        let id = req.session.id;
        res.status(200).json({
          user: findUser.email,
          msg: "successfully logged in",
        });
      } else {
        return res.status(404).json({
          login: "false",
          message: "invalid username or password",
        });
      }
    } catch (error) {
      return res.json({
        login: false,
        message:
          "sorry cant log you in at this time contact ed_knowah or precious for assistance",
      });
    }
  },

  // LOGOUT ADMIN
  logoutAdmin: async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(404);
        console.log(err);
      }
      //res.redirect("/login");
      res.status(200).json({
        logout: true,
      });
    });
  },

  getAllPlayers: async (req, res) => {
    Player.playerModel.find({}, (err, foundData) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.status(200).send(foundData);
      }
    });
  },

  addPlayer: async (req, res) => {
    const person = new Player.playerModel();
    const {
      firstname,
      lastname,
      age,
      height,
      gender,
      hometown,
      playerNumber,
      email,
      img,
    } = req.body;
    
    person.firstName = firstname;
    person.lastName = lastname;
    person.email = email;
    person.playerNumber = playerNumber;
    person.age = age;
    person.gender = gender;
    person.height = height;
    person.hometown = hometown;
    person.img = img;

    person.save((err, savedObject) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        //console.log(savedObject);
        res.status(201).send(savedObject);
      }
    });
  },

  updatePlayer: async (req, res) => {},


  addFixtures: async (req, res) => {
    const fixture = new Fixtures.fixturesModel();
    const {
      venue,
      hometeam,
      awayteam,
      date,
      time,
      hometeamLogo,
      awayteamLogo,
      hometeamScore,
      awayteamScore
    } = req.body;
    fixture.venue = venue;
    fixture.date = date;
    fixture.time = time;
    fixture.hometeam = hometeam;
    fixture.awayteam = awayteam;
    fixture.hometeamLogo = hometeamLogo;
    fixture.awayteamLogo = awayteamLogo;
    fixture.hometeamScore = hometeamScore;
    fixture.awayteamScore = awayteamScore;
    // SAVE FIXTURE
    fixture.save((err, savedObject) => {
      if (err) {
        //console.log(err);
        res.status(500).send();
      } else {
        res.status(201).send(savedObject);
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

  deletePlayer: async (req, res) => {
    const id = req.params.id;
    Player.playerModel.findOneAndRemove({ _id: id }, (err) => {
      if (err) {
        res.status(500).send();
      }
      res.write("delete successfull");
      return res.status(200).send();
    });
  },
};
