const express = require("express");
const router = express.Router();
const isAuth = require("../controllers/auth").isAuth;
const adminController = require("../controllers/adminController");

router.get("/allPlayers", adminController.getAllPlayers);
router.get("/fixtures", adminController.getFixtures);
router.get("/logout", adminController.logoutAdmin);

router.post("/register", adminController.createAdmin);
router.post("/login", adminController.loginAmin);
router.post("/addFixtures", isAuth, adminController.addFixtures);
router.post("/addPlayer", isAuth, adminController.addPlayer);

router.delete("/removePlayer/:id", isAuth, adminController.deletePlayer);

module.exports = {
  router,
};
