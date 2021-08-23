const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/allPlayers", userController.getAllPlayers);
router.get("/fixtures", userController.getFixtures);

module.exports = {
  router,
};
