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