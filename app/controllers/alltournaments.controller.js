const AllTournaments = require("../models/alltournaments.model");
const Rosponse = require("../config/response");
const response = new Rosponse();
// Find a single Tutorial by Id
exports.findUserByID = (req, res) => {
    AllTournaments.findUserByID(req.body.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res, "No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data, "User data has been fetched successfully");
      }
  });
};

exports.getUserTournamentID = (req, res) => {
    AllTournaments.getUserTournamentID(req.body.id, (err, data) => {  
    if (err) {
      if (err.kind === "not_found") {
          response.sendNoData(req, res, "No Record Found");
      } else {
          response.sendError(req, res, "Please try again");
      }
    } else{
      response.sendResponse(req, res, data,"Tournament ID has been fetched successfully");
    }
  });
};

exports.getUserTournament = (req, res) => {
    AllTournaments.getUserTournament(req.body.tour_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res, "No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data,"Tournament has been fetched successfully");
      }
  });
};

exports.getUserMainTournament = (req, res) => {
    AllTournaments.getUserMainTournament(req.body.mainTournamentid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res, "No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data,"Tournament has been fetched successfully");
      }
  });
};

exports.getAllTournaments = (req, res) => {
  AllTournaments.getAllTournaments((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
          response.sendNoData(req, res, "No Record Found");
      } else {
          response.sendError(req, res, "Please try again");
      }
    } else{
      response.sendResponse(req, res, data,"Tournament has been fetched successfully");
    }
});
};

exports.getAllUser = (req, res) => {
  AllTournaments.getAllUser((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
          response.sendNoData(req, res,"No Record Found");
      } else {
          response.sendError(req, res, "Please try again");
      }
    } else{
      response.sendResponse(req, res, data,"User list has been fetched successfully.");
    }
});
};