module.exports = app => {
  const userMaster = require("../controllers/alltournaments.controller");
  const tournament = require("../controllers/tournament.controller");
  const user = require("../controllers/user.controller");
  const player = require("../controllers/player.controller");
  const subAdmin = require("../controllers/subAdmin.controller");
  const editMatch = require("../controllers/editMatch.controller");
  const editTeam = require("../controllers/editTeam.controller");
  var router = require("express").Router();

  // Get User Data Based On User ID
  router.get("/userMaster/getUser", userMaster.findUserByID);
  router.post("/userMaster/getUserTournamentID", userMaster.getUserTournamentID);
  router.post("/userMaster/getUserTournament", userMaster.getUserTournament);
  router.post("/userMaster/getUserMainTournament", userMaster.getUserMainTournament);
  router.get("/userMaster/getAllTournaments", userMaster.getAllTournaments);
  router.get("/userMaster/getAllUser", userMaster.getAllUser);
  router.post("/userMaster/linkUserWithTournament", userMaster.linkUserWithTournament);
  router.post("/userMaster/fetchMyTournament", userMaster.fetchMyTournament);
  router.post("/userMaster/addTournament", userMaster.addTournament);
  

  //Get Tournament Related Operation(assign user, delete tournament, view tournament)
  router.post("/tournament/deleteTournament", tournament.deleteTournament);

  //User Related Operation(add user, view user, reset password)
  router.post("/user/addUser", user.addUser);
  router.get("/user/fetchRegisterUser", user.fetchRegisterUser);
  router.post("/user/resetPassword", user.resetPassword);

  //Player Related Operation(add Player, view Player)
  router.post("/player/addPlayer", player.addPlayer);
  router.post("/player/editPlayer", player.editPlayer);
  router.get("/player/fetchPlayerList", player.fetchPlayerList);

  //Admin Related Operation(add Sub Admin, view Sub Admin, view Sub Admi Permission)
  router.post("/subAdmin/addSubAdmin", subAdmin.addSubAdmin);
  router.get("/subAdmin/fetchSubAdmin", subAdmin.fetchSubAdmin);
  router.post("/subAdmin/editPermission", subAdmin.editPermission);

  //Edit Match Related Operation
  router.post("/editMatch/fetchAllMatchDetails", editMatch.fetchAllMatchDetails);

  //Edit Team Related Operation
  router.post("/editTeam/fetchTournamentPlayers", editTeam.fetchTournamentPlayers);
  router.post("/editTeam/getTournamentTeam", editTeam.getTournamentTeam);
  router.post("/editTeam/getTournamentTeamSquad", editTeam.getTournamentTeamSquad);
  router.post("/editTeam/addTeam", editTeam.insertTeam);
  router.post("/editTeam/addPlayerToSquad", editTeam.addPlayerToSquad);
  router.post("/editTeam/addPlayersToSquad", editTeam.addPlayersToSquad);
  app.use('/api', router);
};
