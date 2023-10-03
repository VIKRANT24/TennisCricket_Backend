const sql = require("./db.js");

// constructor
const EditMatch = function () {
};

EditMatch.fetchAllMatchDetails = (tourid, result) => {
  sql.query("SELECT (Select team_name from CRICONN_TEAMS where team_id = CM.team_one) as team1_name, (Select team_name from CRICONN_TEAMS where team_id = CM.team_two) as team2_name FROM  CRICONN_MATCHES AS CM where tour_id=?", [tourid], (err, res) => {
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

EditMatch.scheduleMatch = (tour_id,	team_one,	team_two,	team1_players,	team2_players,	match_type,	no_of_overs,	place,	ground_id, date_time,	ball_type,
  pitch_type,	umpire1_id,	umpire2_id,	umpire3_id,	commentator_id,	bowler_max_ovr,	power_play,	scorer_id,	match_status,	added_by, result) => {
  let match_key1 = team_one+""+team_two+""+tour_id+date_time
  let match_key2 = team_two+""+team_one+""+tour_id+date_time
  sql.query('SELECT * FROM CRICONN_MATCHES WHERE match_key=? OR match_key=?', [match_key1,match_key2], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result({ kind: "This match is already exist" }, null);
      return;
    }
    else {
      sql.query("INSERT into CRICONN_MATCHES (tour_id,team_one,team_two,team1_players,team2_players,match_type,no_of_overs,place,ground_id,date_time,ball_type,pitch_type,umpire1_id,umpire2_id,umpire3_id,commentator_id,bowler_max_ovr,power_play,scorer_id,match_status,added_by,match_key) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
       [tour_id,team_one,team_two,team1_players,team2_players,match_type,no_of_overs,place,ground_id,date_time,ball_type,pitch_type,umpire1_id,umpire2_id,umpire3_id,commentator_id,bowler_max_ovr,power_play,scorer_id,match_status,added_by,match_key1], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        else {
          result(null, []);
          return;
        }
      });
    }
  });
};
module.exports = EditMatch;
