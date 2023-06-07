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

exports.linkUserWithTournament = (req, res) => {
  AllTournaments.linkUserWithTournament(req.body.user_id, req.body.tourid, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else{
      response.sendResponse(req, res, data, "Assign user successfully");
    }
});
};

exports.fetchMyTournament = (req, res) => {
  AllTournaments.fetchMyTournament(req.body.user_id, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else{
      response.sendResponse(req, res, data, "Assign user successfully");
    }
});
};

exports.addTournament = (req, res) => {
  AllTournaments.addTournament(req.body.tournamentType, req.body.tournament, req.body.organiser, req.body.tourType, req.body.place, req.body.ground, req.body.squadlimit, req.body.season, req.body.ballType, req.body.bowlingType, req.body.noOfGroups, req.body.startDate, req.body.endDate, req.body.year,
    (err, data) => {
      if (err) {
          if (err.kind === "Mobile number already exist") {
              response.sendNoData(req, res, "Mobile number already exist");
          } else {
              response.sendError(req, res, "Please try again");
          }
      } else {
          response.sendResponse(req, res, data, "User has been added successfully");
      }
  });
};
