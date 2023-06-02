module.exports = app => {
  const userMaster = require("../controllers/alltournaments.controller");
  const tournament = require("../controllers/tournament.controller");
  const user = require("../controllers/user.controller");
  const player = require("../controllers/player.controller");
  const subAdmin = require("../controllers/subAdmin.controller");
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

  //User Related Operation(add user, view user, reset password)
  router.post("/user/addUser", user.addUser);
  router.get("/user/fetchRegisterUser", user.fetchRegisterUser);
  router.post("/user/resetPassword", user.resetPassword);

  //Player Related Operation(add Player, view Player)
  router.post("/player/addPlayer", player.addPlayer);
  router.get("/player/fetchPlayerList", player.fetchPlayerList);

  //Admin Related Operation(add Sub Admin, view Sub Admin, view Sub Admi Permission)
  router.post("/subAdmin/addSubAdmin", subAdmin.addSubAdmin);
  router.get("/subAdmin/fetchSubAdmin", subAdmin.fetchSubAdmin); 
  router.post("/subAdmin/editPermission", subAdmin.editPermission);

  app.use('/api', router);
};
