const AllTournaments = require("../models/alltournaments.model");
const Rosponse = require("../config/response");
const response = new Rosponse();
// Find a single Tutorial by Id
exports.findUserByID = (req, res) => {
    if(req.body.id == "" || req.body.id == null || req.body.id == undefined){
      response.sendError(req, res, "Please provide User id");
    }
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
  if(req.body.id == "" || req.body.id == null || req.body.id == undefined){
    response.sendError(req, res, "Please provide User id");
  }
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
  if(req.body.tour_id == "" || req.body.tour_id == null || req.body.tour_id == undefined){
    response.sendError(req, res, "Please provide Tournament id");
  }
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
  if(req.body.mainTournamentid == "" || req.body.mainTournamentid == null || req.body.mainTournamentid == undefined){
    response.sendError(req, res, "Please provide Tournament id");
  }
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
  AllTournaments.getAllTournaments((err, tournamentList, userList) => {
    if (err) {
      if (err.kind === "not_found") {
          response.sendNoData(req, res, "No Record Found");
      } else {
          response.sendError(req, res, "Please try again");
      }
    } else{
      res.status(200).send({
        message: "Tournament has been fetched successfully",
        statusCode: "00",
        data:tournamentList,
        userList: userList    
    });
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
      response.sendResponse(req, res, data, "Fetch my tournament successfully");
    }
});
};

exports.addTournament = (req, res) => {
  AllTournaments.addTournament(req.body.tournamentType, req.body.tournament, req.body.organiser, req.body.tourType, req.body.place, req.body.ground, req.body.squadlimit, req.body.season, req.body.ballType, req.body.bowlingType, req.body.noOfGroups, req.body.startDate, req.body.endDate, req.body.year, req.body.tourUnqId, req.body.subAdName, req.body.subAdId,
    (err, data) => {
      if (err) {
          if (err.kind === "Mobile number already exist") {
              response.sendNoData(req, res, "Mobile number already exist");
          } else {
              response.sendError(req, res, "Please try again");
          }
      } else {
          response.sendResponse(req, res, data, "Tournament has been added successfully");
      }
  });
};

exports.searchTournament = (req, res) => {
  AllTournaments.searchTournament(req.body.tournamentName, req.body.tournamentId, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else{
      response.sendResponse(req, res, data, "Fetch my tournament successfully");
    }
});
};

