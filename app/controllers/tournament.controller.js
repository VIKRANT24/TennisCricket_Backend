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

exports.addNewTournament = (req, res) => {
  Tournament.addNewTournament(req.body.tour_id, req.body.tour_name, req.body.current_season, req.body.creator_mobile,	req.body.creator_id,	req.body.tour_banner,req.body.tour_logo,
  req.body.squad_limit,	req.body.place,	req.body.ground_id,	req.body.tour_type,	req.body.tour_category,	req.body.pitch_type,	req.body.ball_type,	req.body.start_date,	req.body.end_date,
    (err, data) => {
      if (err) {
          if (err.kind === "Mobile number already exist") {
              response.sendNoData(req, res, "Mobile number already exist");
          } else {
              response.sendError(req, res, "Please try again");
          }
      } else {
          response.sendResponse(req, res, [], "Tournament has been added successfully");
      }
  });
};
