const User = require("../models/player.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.addPlayer = (req, res) => {
    User.addPlayer(req.body.player_name, req.body.player_mobile, req.body.player_logo, req.body.player_place, req.body.player_email, req.body.player_dob, req.body.tour_id, req.body.team_id, req.body.is_selected, (err, data) => {
        if (err) {
            if (err.kind === "Mobile number already exist") {
                response.sendNoData(req, res, "Mobile number already exist");
            } else {
                response.sendError(req, res, "Please try again...");
            }
        } else {
            response.sendResponse(req, res, [], "Player has been added successfully");
        }
    });
};
exports.editPlayer = (req, res) => {
    User.editPlayer(req.body.player_name, req.body.player_logo, req.body.player_place, req.body.player_email, req.body.player_dob, req.body.player_id, (err, data) => {
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
        } else {
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
        } else {
            response.sendResponse(req, res, data, "Teams has been fetched successfully.");
        }
    });
};
exports.addBatter = (req, res) => {
    User.addBatter(req.body.player_id, req.body.match_id, req.body.tournament_id, req.body.runs, req.body.four, req.body.six, req.body.ball_faced, req.body.out_type, req.body.out_by, req.body.ground_id, req.body.place_id, (err, data) => {
        if (err) {
            response.sendError(req, res, "Please try again");
        } else {
            response.sendResponse(req, res, [], "Record has been added successfully");
        }
    });
};
exports.addBowler = (req, res) => {
    User.addBowler(req.body.player_id, req.body.match_id, req.body.tournament_id, req.body.runs, req.body.balls, req.body.maidens, req.body.wickets, req.body.ground_id, req.body.place_id, (err, data) => {
        if (err) {
            response.sendError(req, res, "Please try again");
        } else {
            response.sendResponse(req, res, [], "Record has been added successfully");
        }
    });
};
exports.fetchPlayerList = (req, res) => {
    var player_name = req.body.player_name
    User.fetchPlayerList(player_name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                response.sendNoData(req, res, "No Record Found");
            } else {
                response.sendError(req, res, "Please try again");
            }
        } else {
            response.sendResponse(req, res, data, "Player list has been fetched successfully.");
        }
    });
};
exports.fetchPlayerStat = (req, res) => {
    User.fetchPlayerStat(req.body.player_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                response.sendNoData(req, res, "No Record Found");
            } else {
                response.sendError(req, res, "Please try again");
            }
        } else {
            response.sendResponse(req, res, data, "Player record has been fetched successfully.");
        }
    });
};

