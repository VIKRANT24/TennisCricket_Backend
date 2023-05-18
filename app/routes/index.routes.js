module.exports = app => {
  const userMaster = require("../controllers/alltournaments.controller");
  var router = require("express").Router();

  // Get User Data Based On User ID
  router.post("/userMaster/getUser", userMaster.findUserByID);
  router.post("/userMaster/getUserTournamentID", userMaster.getUserTournamentID);
  router.post("/userMaster/getUserTournament", userMaster.getUserTournament);
  router.post("/userMaster/getUserMainTournament", userMaster.getUserMainTournament);
  router.get("/userMaster/getAllTournaments", userMaster.getAllTournaments);


  app.use('/api', router);
};
