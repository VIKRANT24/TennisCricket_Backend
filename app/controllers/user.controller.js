const User = require("../models/user.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.addUser = (req, res) => {
    User.addUser(req.body.user_id, req.body.username, req.body.password, (err, data) => {
      if (err) {
        if (err.kind === "User already exist") {
            response.sendNoData(req, res, "User already exist")
        } else {
            response.sendError(req, res, "Please try again later")
        }
      } else{
        response.sendResponse(req, res, data, "User has been added successfully")
      }
  });
};

exports.fetchRegisterUser = (req, res) => {
    User.fetchRegisterUser((err, data) => {
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
