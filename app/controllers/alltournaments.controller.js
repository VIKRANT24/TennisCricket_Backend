const AllTournaments = require("../models/alltournaments.model");

// Find a single Tutorial by Id
exports.findUserByID = (req, res) => {
    AllTournaments.findUserByID(req.body.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.body.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.body.id
        });
      }
    } else res.send(data);
  });
};

exports.getUserTournamentID = (req, res) => {
    AllTournaments.getUserTournamentID(req.body.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User Data not found with id ${req.body.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tournament with id " + req.body.id
        });
      }
    } else res.send(data);
  });
};

exports.getUserTournament = (req, res) => {
    AllTournaments.getUserTournament(req.body.tour_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tournament not found with id ${req.body.tour_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tournament with id " + req.body.tour_id
        });
      }
    } else res.send(data);
  });
};

exports.getUserMainTournament = (req, res) => {
    AllTournaments.getUserMainTournament(req.body.mainTournamentid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Main Tournament not found with id ${req.body.mainTournamentid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tournament with id " + req.body.mainTournamentid
        });
      }
    } else res.send(data);
  });
};

exports.getAllTournaments = (req, res) => {
  AllTournaments.getAllTournaments((err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Main Tournament not found with id ${req.body.mainTournamentid}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Tournament with id " + req.body.mainTournamentid
      });
    }
  } else res.send(data);
});
};