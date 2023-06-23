const EditTeam = require("../models/editTeam.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.fetchTournamentPlayers = (req, res) => {
    EditTeam.fetchTournamentPlayers(req.body.tourid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res, "No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data, "Player list has been fetched successfully.");
      }
  });
};
exports.getTournamentTeam = (req, res) => {
    EditTeam.getTournamentTeam(req.body.tourid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res,"No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data,"Team Fetch Successfully");
      }
  });
  };
  exports.getTournamentTeamSquad = (req, res) => {
    EditTeam.getTournamentTeamSquad(req.body.tourid, req.body.teamid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res,"No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data,"Team Player Fetch Successfully");
      }
  });
  };
  exports.insertTeam = (req, res) => {
    EditTeam.insertTeam(req.body.tourid, req.body.teamname, req.body.logopath, req.body.teamcolor, req.body.textcolor,(err, teamid) => {
      if (err) {
        if (err.kind === "Team already exist") {
            response.sendNoData(req, res, "Team already exist");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, {"teamId":teamid}, "Team has been added successfully");
      }
  });
};
exports.addPlayersToSquad = (req, res) => {
  EditTeam.addPlayersToSquad(req.body.squadPlayers,(err, data) => {
    if (err) {
      if (err.kind === "Player not available") {
          response.sendNoData(req, res, "Player not available");
      } else {
          response.sendError(req, res, "Please try again");
      }
    } else{
      response.sendResponse(req, res, data, "Team has been added successfully");
    }
});
};
exports.addPlayerToSquad = (req, res) => {
  EditTeam.addPlayerToSquad(req.body.tourid, req.body.teamid, req.body.playerid, req.body.playing11, (err, data) => {
    if (err) {
        response.sendError(req, res, "Please try again");
    } else{
      response.sendResponse(req, res, data, "Player has been added successfully");
    }
});
};

