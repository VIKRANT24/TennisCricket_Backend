const Common = require("../models/common.model");
const Rosponse = require("../config/response");
const response = new Rosponse();


exports.addGround = (req, res) => {
    Common.addGround(req.body.ground_name, req.body.ground_latlong, req.body.ground_id, (err, data) => {
      if (err) {
          if (err.kind === "Ground already Available") {
              response.sendNoData(req, res, "Ground already Available");
          } else {
              response.sendError(req, res, "Please try again");
          }
      } else {
          response.sendResponse(req, res, data, "Ground has been added successfully");
      }
  });
};

exports.fetchGround = (req, res) => {
    Common.fetchGround((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res, "No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data, "Ground list has been fetched successfully.");
      }
  });
};
