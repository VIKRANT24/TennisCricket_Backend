const Tournament = require("../models/tournament.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.deleteTournament = (req, res) => {
    Tournament.deleteTournament(req.body.tour_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res,"No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, [],"Delete Tournament Successfully");
      }
  });
};
