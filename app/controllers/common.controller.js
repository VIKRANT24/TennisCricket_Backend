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

exports.addCommentator = (req, res) => {
  Common.addCommentator(req.body.coment_name, req.body.coment_mobile, req.body.coment_location, req.body.coment_image, (err, data) => {
    if (err) {
        if (err.kind === "Commentator already exist") {
            response.sendNoData(req, res, "Commentator already exist");
        } else {
            response.sendError(req, res, "Please try again");
        }
    } else {
        response.sendResponse(req, res, data, "Commentator has been added successfully");
    }
});
};

exports.fetchCommentator = (req, res) => {
  Common.fetchCommentator((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
          response.sendNoData(req, res, "No Record Found");
      } else {
          response.sendError(req, res, "Please try again");
      }
    } else{
      response.sendResponse(req, res, data, "Commentator list has been fetched successfully.");
    }
});
};

exports.addUmpires = (req, res) => {
  Common.addUmpires(req.body.umpire_name, req.body.umpire_mobile, req.body.umpire_location, req.body.umpire_image, (err, data) => {
    if (err) {
        if (err.kind === "Umpire already exist") {
            response.sendNoData(req, res, "Umpire already exist");
        } else {
            response.sendError(req, res, "Please try again");
        }
    } else {
        response.sendResponse(req, res, data, "Umpire has been added successfully");
    }
});
};

exports.fetchUmpires = (req, res) => {
  Common.fetchUmpires((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
          response.sendNoData(req, res, "No Record Found");
      } else {
          response.sendError(req, res, "Please try again");
      }
    } else{
      response.sendResponse(req, res, data, "Umpire list has been fetched successfully.");
    }
});
};

exports.fetchOfficials = (req, res) => {
  if(req.body.tour_id == "" || req.body.tour_id == null || req.body.tour_id == undefined){
    response.sendError(req, res, "Please provide Tournament id");
  }
      Common.fetchTourOfficials(req.body.tour_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
              response.sendNoData(req, res, "No Record Found");
          } else {
              response.sendError(req, res, "Please try again");
          }
        } else{
          response.sendResponse(req, res, data, "Officials list has been fetched successfully.");
        }
    });
};