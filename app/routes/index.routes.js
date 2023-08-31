module.exports = app => {
  const userMaster = require("../controllers/alltournaments.controller");
  const tournament = require("../controllers/tournament.controller");
  const user = require("../controllers/user.controller");
  const player = require("../controllers/player.controller");
  const subAdmin = require("../controllers/subAdmin.controller");
  const editMatch = require("../controllers/editMatch.controller");
  const editTeam = require("../controllers/editTeam.controller");
  const statistics = require("../controllers/matchStatistic.controller");
  const common = require("../controllers/common.controller");
  const fileUpload = require("../controllers/fileUpload.controller");
  var router = require("express").Router();

  // Get User Data Based On User ID
  router.post("/userMaster/getUser", userMaster.findUserByID);
  router.post("/userMaster/getUserTournamentID", userMaster.getUserTournamentID);
  router.post("/userMaster/getUserTournament", userMaster.getUserTournament);
  router.post("/userMaster/getUserMainTournament", userMaster.getUserMainTournament);
  router.get("/userMaster/getAllTournaments", userMaster.getAllTournaments);
  router.get("/userMaster/getAllUser", userMaster.getAllUser);
  router.post("/userMaster/linkUserWithTournament", userMaster.linkUserWithTournament);
  router.post("/userMaster/fetchMyTournament", userMaster.fetchMyTournament);
  router.post("/userMaster/addTournament", userMaster.addTournament);
  router.post("/userMaster/searchTournament", userMaster.searchTournament);

  //Get Tournament Related Operation(assign user, delete tournament, view tournament)
  router.post("/tournament/deleteTournament", tournament.deleteTournament);
  router.post("/tournament/addNewTournament", tournament.addNewTournament);
  router.post("/tournament/fetchMyTournament", tournament.fetchMyTournament);


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
  router.post("/editMatch/insertMatch", editMatch.insertMatch);

  //Edit Team Related Operation
  router.post("/editTeam/fetchTournamentPlayers", editTeam.fetchTournamentPlayers);
  router.post("/editTeam/getTournamentTeam", editTeam.getTournamentTeam);
  router.post("/editTeam/getTournamentTeamSquad", editTeam.getTournamentTeamSquad);
  router.post("/editTeam/addTeam", editTeam.insertTeam);
  router.post("/editTeam/addPlayerToSquad", editTeam.addPlayerToSquad);
  router.post("/editTeam/addPlayersToSquad", editTeam.addPlayersToSquad);
  router.post("/editTeam/removePlayerFromSquad", editTeam.removePlayerFromSquad);
  router.post("/editTeam/updateTeam", editTeam.updateTeam);
  router.post("/editTeam/updateSquadPlayer", editTeam.updateSquadPlayer);

  //tournament statistics
  router.post("/statistics/getTournamentBatting", statistics.fetchTournamentBatting);
  router.post("/statistics/getTournamentBolwing", statistics.fetchTournamentBolwing);
  router.post("/statistics/getTournamentPartnership", statistics.fetchTournamentPartnership);
  router.post("/statistics/getFastestFiftyHundred", statistics.fetchFastestFiftyHundred);

  //ground related operation
  router.post("/ground/addGround", common.addGround);
  router.get("/ground/fetchGround", common.fetchGround);

  //commentator related operation
  router.post("/commentator/addCommentator", common.addCommentator);
  router.get("/commentator/fetchCommentator", common.fetchCommentator);

  //umpire related operation
  router.post("/umpire/addUmpires", common.addUmpires);
  router.get("/umpire/fetchUmpires", common.fetchUmpires);

  // upload and fetch image
  router.post("/images/uploadImage", fileUpload.upload);

  app.use('/api', router);
};
