const Player = require("../models/playerModel");
const Team = require("../models/teamModel");
const Fixtures = require("../models/fixturesModel");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

module.exports = {
  // REGISTER USER
  createAdmin: async (req, res) => {
    const admin = new Admin.adminModel();
    const { firstname, lastname, email, password } = req.body;
    // console.log(password);
    admin.firstname = firstname;
    admin.lastname = lastname;
    admin.email = email;
    const suppliedPassword = password;

    // hash Userpassword
    try {
      admin.password = await bcrypt.hash(suppliedPassword, 10);
    } catch (error) {
      console.log("error", error);
    }

    // save new admin to DB
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

  //LOGIN USER LOGIC
  loginAmin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const findUser = await Admin.adminModel.findOne({ email });
      //console.log(findUser)
      if (!findUser) {
        return res.status(404).json({
          login: "false",
          message: "invalid username or password",
        });
      }
      const isMatch = await bcrypt.compare(password, findUser.password);

      if (isMatch) {
        //console.log(findUser)
        req.session.isLoggedIn = true;
        req.session.user = findUser;
        req.session.save();
        let id = req.session.id;
        console.log(id);
        //console.log(req.session.user._id);
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
        res.send(foundData);
        //console.log(foundData);
      }
    });
  },

  addPlayer: async (req, res) => {
    const person = new Player.playerModel();

    person.firstName = req.body.firstname;
    person.lastName = req.body.lastname;
    person.age = req.body.age;
    person.height = req.body.height;
    person.gender = req.body.gender;
    person.hometown = req.body.hometown;
    person.playerNumber = req.body.playerNumber;
    const findTeam = await Team.teamModel.findOne({ name: req.body.team });
    if (!findTeam) {
      return res.status(404).json({
        added: "false",
        message:
          "no team like that, create one before adding player to the team",
      });
    }
    //person.team = await Team.teamModel.findOne({ name: req.body.team });
    person.team = req.body.team;

    person.save((err, savedObject) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        console.log(savedObject);
        res.send(savedObject);
      }
    });
  },

  updatePlayer: async (req, res) => {},

  addTeam: async (req, res) => {
    const team = new Team.teamModel();
    team.name = req.body.name;
    team.logo = req.body.logo;
    //team.players = await Player.playerModel.find();

    team.save((err, savedObject) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(savedObject);
        //console.log(savedObject);
      }
    });
  },

  getTeamPlayers: async (req, res) => {
    const teamName = req.params.teamName;
    const teamDetails = await Team.teamModel.find({ name: teamName });
    console.log(teamDetails);
    Player.playerModel.find({ team: teamName }, (err, foundData) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        //res.send(foundData);
        //console.log(foundData);
        res.status(200).json({
          players: foundData,
          team: teamDetails,
        });
      }
    });
  },

  addFixtures: async (req, res) => {
    const fixture = new Fixtures.fixturesModel();
    fixture.venue = req.body.venue;
    fixture.hometeam = req.body.hometeam;
    fixture.awayteam = req.body.awayteam;
    fixture.date = req.body.date;
    fixture.time = req.body.time;

    fixture.save((err, savedObject) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(savedObject);
        // console.log(savedObject);
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

  // updateFixtures: async (req, res)=>{
  //   const id = req.params.id
  //   Fixtures.fixturesModel.findById()
  // },

  deletePlayer: async (req, res) => {
    const id = req.params.id;
    Player.playerModel.findOneAndRemove({ _id: id }, (err) => {
      if (err) {
        // console.log(err);
        res.status(500).send();
      }
      res.write("delete successfull");
      return res.status(200).send();
    });
  },
};
