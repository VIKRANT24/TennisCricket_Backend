const Tournament = require("../models/tournament.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.deleteUser = (req, res) => {
    Tournament.deleteUser(req.body.tour_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res)
        } else {
            response.sendError(req, res)
        }
      } else{
        response.sendResponse(req, res, data)
      }
  });
};