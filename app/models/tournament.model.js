const sql = require("./db.js");

// constructor
const Tournament = function() {
};

Tournament.deleteUser = (tourid, result) => {
    // var get = {user_id: id};

    sql.query(`delete from commentry where Tournamentid=${tourid};delete from fastest50100 where Tournamentid=${tourid};delete from match_batting_innings where Tournamentid=${tourid};delete from match_bowling_innings where Tournamentid=${tourid};delete from match_details where Tournamentid=${tourid};delete from match_teaminningsdetails where Tournamentid=${tourid};delete from partnerships where Tournamentid=${tourid};delete from teams where tournamentid=${tourid};delete from teamsquad where tournamentid=${tourid};delete from tournaments where Tournamentid=${tourid}`, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], function(err, results) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          if (results.length) {
            result(null, results);
            return;
          }
          result({ kind: "not_found" }, null);
     });
  };
  module.exports = Tournament;