module.exports = app => {
  const userMaster = require("../controllers/alltournaments.controller");
  const tournament = require("../controllers/tournament.controller");
  const user = require("../controllers/user.controller");
  var router = require("express").Router();

  // Get User Data Based On User ID
  router.post("/userMaster/getUser", userMaster.findUserByID);
  router.post("/userMaster/getUserTournamentID", userMaster.getUserTournamentID);
  router.post("/userMaster/getUserTournament", userMaster.getUserTournament);
  router.post("/userMaster/getUserMainTournament", userMaster.getUserMainTournament);
  router.get("/userMaster/getAllTournaments", userMaster.getAllTournaments);
  router.get("/userMaster/getAllUser", userMaster.getAllUser);

  //Get Tournament Related Operation(assign user, delete tournament, view tournament)
  router.post("/tournament/deleteTournament", tournament.deleteUser);

  //User Related Operation(add user, delete user, view user)
  router.post("/user/addUser", user.addUser);
  router.get("/user/fetchRegisterUser", user.fetchRegisterUser);

  app.use('/api', router);
};
