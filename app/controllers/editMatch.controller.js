const EditMatch = require("../models/editMatch.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.fetchAllMatchDetails = (req, res) => {
  if(req.body.tour_id == "" || req.body.tour_id == null || req.body.tour_id == undefined){
    response.sendError(req, res, "Please provide Tournament id");
  }
    EditMatch.fetchAllMatchDetails(req.body.tourid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res, "No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data, "Match details has been fetched successfully.");
      }
  });
};
exports.scheduleMatch = (req, res) => {
  EditMatch.scheduleMatch(req.body.tour_id, req.body.team_one, req.body.team_two, req.body.team1_players, req.body.team2_players, req.body.match_type,
  req.body.no_of_overs, req.body.place, req.body.ground_id, req.body.date_time, req.body.ball_type, req.body.pitch_type,req.body.umpire1_id, req.body.umpire2_id,
  req.body.umpire3_id, req.body.commentator_id, req.body.bowler_max_ovr, req.body.power_play,req.body.scorer_id, req.body.match_status, req.body.added_by, (err, data) => {
    if (err) {
      if (err.kind === "This match is already present") {
        response.sendNoData(req, res, "This match is already present");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      response.sendResponse(req, res, [], "Match has been added successfully");
    }
  });
};
exports.matchRecord = (req, res) => {
  EditMatch.matchRecord(req.body.match_id, req.body.match_score, (err, data) => {
    if (err) {
        response.sendError(req, res, "Please try again");
    } else {
      response.sendResponse(req, res, [], "Match record has been added successfully");
    }
  });
};
