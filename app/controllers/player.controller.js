const User = require("../models/player.model");
const Rosponse = require("../config/response");
const response = new Rosponse();

exports.addPlayer = (req, res) => {
    User.addPlayer(req.body.playername, req.body.imgdata, req.body.playerrole, req.body.playermobile, req.body.email, req.body.batting, req.body.bowling, req.body.dob, (err, data) => {
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

exports.fetchPlayerList = (req, res) => {
    User.fetchPlayerList((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
            response.sendNoData(req, res, "No Record Found");
        } else {
            response.sendError(req, res, "Please try again");
        }
      } else{
        response.sendResponse(req, res, data, "Player list has been fetched successfully.");
      }
  });
};