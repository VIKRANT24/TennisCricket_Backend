const EditMatch = require("../models/editMatch.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.fetchAllMatchDetails = (req, res) => {
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
exports.insertMatch = (req, res) => {
  EditMatch.insertMatch(req.body.matchkey, req.body.team1, req.body.team2, req.body.format, req.body.status, req.body.start_date, req.body.overs, req.body.match_state, req.body.tournament_id, (err, data) => {
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