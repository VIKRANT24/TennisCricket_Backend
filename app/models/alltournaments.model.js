const sql = require("./db.js");

// constructor
const AllTournaments = function() {
};

AllTournaments.findUserByID = (id, result) => {
    var get = {user_id: id};
    sql.query('SELECT * FROM usermaster WHERE ? ', get, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };
  AllTournaments.getUserTournamentID = (id, result) => {
    var get = {userid: id};
    sql.query('SELECT * FROM usertournament WHERE ? ', get, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }  
      if (res.length) {
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };
  AllTournaments.getUserTournament = (tour_id, result) => {
    var get = {Tournamentid: tour_id};
    sql.query('SELECT * FROM tournaments WHERE ? ', get, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };
  AllTournaments.getUserMainTournament = (mainTournamentid, result) => {
    var get = {mainTournamentid: mainTournamentid};
    sql.query('SELECT * FROM maintournaments WHERE ? ', get, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };
  AllTournaments.getAllTournaments = (result) => {
    sql.query('SELECT T.*,MT.TournamentName FROM `tournaments` as T inner join maintournaments as MT on T.`mainTournamentid`=MT.mainTournamentid order by MT.`mainTournamentid`,Tournamentid',(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };
  AllTournaments.getAllUser = (result) => {
    sql.query('SELECT * FROM usermaster',(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };
  module.exports = AllTournaments;