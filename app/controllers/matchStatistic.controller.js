const MatchStatistics = require("../models/matchStatistic.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.fetchTournamentBatting = (req, res) => {
    MatchStatistics.fetchTournamentBatting(req.body.tourid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.sendNoData(req, res, "No Record Found");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      response.sendResponse(req, res, data, "Batting record has been fetched successfully.");
    }
  });
};

exports.fetchTournamentBolwing = (req, res) => {
    MatchStatistics.fetchTournamentBolwing(req.body.tourid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.sendNoData(req, res, "No Record Found");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      response.sendResponse(req, res, data, "Bowling record has been fetched successfully.");
    }
  });
};

exports.fetchTournamentPartnership = (req, res) => {
    MatchStatistics.fetchTournamentPartnership(req.body.tourid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.sendNoData(req, res, "No Record Found");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      response.sendResponse(req, res, data, "Partnership record has been fetched successfully.");
    }
  });
};

exports.fetchFastestFiftyHundred = (req, res) => {
    MatchStatistics.fetchFastestFiftyHundred(req.body.tourid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.sendNoData(req, res, "No Record Found");
      } else {
        response.sendError(req, res, "Please try again");
      }
    } else {
      response.sendResponse(req, res, data, "Fastest 50 and 100 record has been fetched successfully.");
    }
  });
};
exports.fetchTournamentStats = (req, res) => {
  MatchStatistics.fetchTournamentStats(req.body.tour_id, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else{
      response.sendResponse(req, res, data, "Fetch my tournament successfully");
    }
});
};
exports.fetchTournamentOverview = (req, res) => {
  MatchStatistics.fetchTournamentOverview(req.body.tour_id, req.body.match_id, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else{
      response.sendResponse(req, res, data, "Fetch tournament data successfully");
    }
});
};
exports.fetchMVP = (req, res) => {
  MatchStatistics.fetchMVP(req.body.tour_id, req.body.match_id, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else{
      response.sendResponse(req, res, data, "Fetch match data successfully");
    }
});
};


