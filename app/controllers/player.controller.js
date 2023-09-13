const User = require("../models/player.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.addPlayer = (req, res) => {
    User.addEditPlayer(req.body.player_name, req.body.player_mobile, req.body.player_logo, req.body.player_place, req.body.player_email, req.body.player_dob, req.body.tour_id, req.body.team_id, req.body.is_selected, "add", (err, data) => {
        if (err) {
            if (err.kind === "Mobile number already exist") {
                response.sendNoData(req, res, "Mobile number already exist");
            } else {
                response.sendError(req, res, "Please try again");
            }
        } else {
            response.sendResponse(req, res, [], "Player has been added successfully");
        }
    });
};
exports.editPlayer = (req, res) => {
    User.addEditPlayer(req.body.playername, req.body.imgdata, req.body.playerrole, req.body.playermobile, req.body.email, req.body.batting, req.body.bowling, req.body.dob, req.body.playerid, "edit", req.body.country, req.body.state, req.body.city, (err, data) => {
        if (err) {
            if (err.kind === "Mobile number already exist") {
                response.sendNoData(req, res, "Mobile number already exist");
            } else {
                response.sendError(req, res, "Please try again");
            }
        } else {
            response.sendResponse(req, res, data, "Player has been updated successfully");
        }
    });
};
exports.searchPlayers = (req, res) => {
    User.searchPlayers(req.body.search_text, (err, data) => {
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
exports.fetchPlayerTeams = (req, res) => {
    User.fetchPlayerTeams(req.body.player_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res, "No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data, "Teams has been fetched successfully.");
      }
  });
};