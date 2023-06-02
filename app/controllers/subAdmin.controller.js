const SubAdmin = require("../models/subAdmin.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.addSubAdmin = (req, res) => {
    SubAdmin.addSubAdmin(req.body.user_id, req.body.username, req.body.password, req.body.permissions, (err, data) => {
      if (err) {
        if (err.kind === "User already exist") {
            response.sendNoData(req, res, "Sub Admin already exist");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data, "Sub Admin has been added successfully");
      }
  });
};

exports.editPermission = (req, res) => {
  SubAdmin.editPermission(req.body.user_id, req.body.permissions, (err, data) => {
    if (err) {
      response.sendError(req, res, "Please try again");
    } else{
      response.sendResponse(req, res, data, "Permissions has been updated successfully");
    }
});
};

exports.fetchSubAdmin = (req, res) => {
    SubAdmin.fetchSubAdmin((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res, "No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data, "Sub Admin list has been fetched successfully.");
      }
  });
};

