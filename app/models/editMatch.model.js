const sql = require("./db.js");

// constructor
const EditMatch = function () {
};

EditMatch.fetchAllMatchDetails = (tourid, result) => {
  sql.query("SELECT match_id, tour_id, match_type, no_of_overs, place, match_status, date_time, ground_id, (Select ground_name from CRICONN_GROUNDS where id = CM.ground_id) as ground_name, (Select team_name from CRICONN_TEAMS where team_id = CM.team_one) as team1_name, (Select team_name from CRICONN_TEAMS where team_id = CM.team_two) as team2_name FROM  CRICONN_MATCHES AS CM where tour_id=?", [tourid], (err, res) => {
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

EditMatch.scheduleMatch = (tour_id, team_one, team_two, team1_players, team2_players, match_type, no_of_overs, place, ground_id, date_time, ball_type,
  pitch_type, umpire1_id, umpire2_id, umpire3_id, commentator_id, bowler_max_ovr, power_play, scorer_id, match_status, added_by, result) => {
  let match_key1 = team_one + "" + team_two + "" + tour_id + date_time
  let match_key2 = team_two + "" + team_one + "" + tour_id + date_time
  sql.query('SELECT * FROM CRICONN_MATCHES WHERE match_key=? OR match_key=?', [match_key1, match_key2], (err, res) => {
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
        [tour_id, team_one, team_two, team1_players, team2_players, match_type, no_of_overs, place, ground_id, date_time, ball_type, pitch_type, umpire1_id, umpire2_id, umpire3_id, commentator_id, bowler_max_ovr, power_play, scorer_id, match_status, added_by, match_key1], (err, res) => {
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

EditMatch.matchRecord = (match_id, match_score, tour_id, ground_id, place, result) => {
  let match_stats = match_score;
  match_stats.tour_id = tour_id;
  match_stats.ground_id = ground_id;
  match_stats.place = place;
  sql.query("SELECT * from CRICONN_MATCH_RECORDS WHERE match_id=?", [match_id], (error, reslt) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }
    if (reslt.length == 0) {
      sql.query("INSERT into CRICONN_MATCH_RECORDS (match_id,match_score) values (?,?)", [match_id, JSON.stringify(match_stats)], (err, res) => {
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
    } else {
      sql.query("UPDATE CRICONN_MATCH_RECORDS SET ? WHERE match_id =?", [{ match_score: JSON.stringify(match_stats) }, match_id], (err, res) => {
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
}

EditMatch.fetchMatchRecord = (match_id, result) => {
  sql.query("SELECT * from CRICONN_MATCH_RECORDS WHERE match_id=?", [match_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      console.log(res[0]);
      if (res.length > 0) {
        var matchScore = res[0].match_score;
        res[0].match_score = JSON.parse(matchScore);
        result(null, res);
        return;
      } else {
        result(null, []);
        return;
      }

    }
  });
}

EditMatch.finalMatchRecord = (match_id, match_score, tour_id, ground_id, place, result) => {
  let inning1_batter = match_score.match.inning1.batters
  let inning2_batter = match_score.match.inning2.batters
  let inning1_bowler = match_score.match.inning1.bowlers
  let inning2_bowler = match_score.match.inning2.bowlers
  let match_batters = [];
  let match_bowlers = [];
  if ((inning1_batter != undefined && inning1_batter != null && inning1_batter.length > 0) && (inning2_batter != undefined && inning2_batter != null && inning2_batter.length > 0)) {
    match_batters = [...inning1_batter, ...inning2_batter];
  } else if (inning1_batter != undefined && inning1_batter != null && inning1_batter.length > 0) {
    match_batters = inning1_batter;
  } else if (inning2_batter != undefined && inning2_batter != null && inning2_batter.length > 0) {
    match_batters = inning2_batter;
  }

  if ((inning1_bowler != undefined && inning1_bowler != null && inning1_bowler.length > 0) && (inning2_bowler != undefined && inning2_bowler != null && inning2_bowler.length > 0)) {
    match_bowlers = [...inning1_bowler, ...inning2_bowler];
  } else if (inning1_bowler != undefined && inning1_bowler != null && inning1_bowler.length > 0) {
    match_bowlers = inning1_bowler;
  } else if (inning2_bowler != undefined && inning2_bowler != null && inning2_bowler.length > 0) {
    match_bowlers = inning2_bowler;
  }
  let match_stats = match_score;
  match_stats.tour_id = tour_id;
  match_stats.ground_id = ground_id;
  match_stats.place = place;
  sql.query("UPDATE CRICONN_MATCH_RECORDS SET ? WHERE match_id =?", [{ match_score: JSON.stringify(match_stats) }, match_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      storeBattersRecord(match_batters, match_id, tour_id, ground_id, place);
      storeBowlersRecord(match_bowlers, match_id, tour_id, ground_id, place);
      result(null, []);
      return;
    }
  });
}
storeBattersRecord = (match_batters, match_id, tour_id, ground_id, place) => {
  console.log("match_batters1" + JSON.stringify(match_batters));
  for (let i = 0; i < match_batters.length; i++) {
    let plyer_id = match_batters[i].p_id.toString();
    let stats = match_batters[i];
    stats.match_id = match_id;
    stats.tour_id = tour_id;
    stats.ground_id = ground_id;
    stats.place = place;
    let stats_arr = [];
    stats_arr.push(stats);
    sql.query("SELECT * from CRICONN_BATTER WHERE player_id=?", [plyer_id], (error, reslt) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      if (reslt.length == 0) {
        sql.query("INSERT into CRICONN_BATTER (player_id,statistics) values (?,?)", [plyer_id, JSON.stringify(stats_arr)], (err, res) => {
          if (err) {
            console.log("error: ", err);
          }
          else {
            console.log("new record inserted");
          }
        });
      } else {
        let batsman_data = [];
        batsman_data = reslt;
        batsman_data[0].statistics = [...JSON.parse(batsman_data[0].statistics), ...stats_arr];
        sql.query("UPDATE CRICONN_BATTER SET ? WHERE player_id =?", [{ statistics: JSON.stringify(batsman_data[0].statistics) }, plyer_id], (err, res) => {
          if (err) {
            console.log("error: ", err);
          }
          else {
            console.log("old record updated");
          }
        });
      }

    });
  }
}
storeBowlersRecord = (match_bowlers, match_id, tour_id, ground_id, place) => {
  console.log("match_bowlers1" + JSON.stringify(match_bowlers));
  for (let i = 0; i < match_bowlers.length; i++) {
    let plyer_id = match_bowlers[i].id;
    let stats = match_bowlers[i];
    stats.match_id = match_id;
    stats.tour_id = tour_id;
    stats.ground_id = ground_id;
    stats.place = place;
    let stats_arr = [];
    stats_arr.push(stats);
    sql.query("SELECT * from CRICONN_BOWLER WHERE player_id=?", [plyer_id], (error, reslt) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      if (reslt.length == 0) {
        sql.query("INSERT into CRICONN_BOWLER (player_id,statistics) values (?,?)", [plyer_id, JSON.stringify(stats_arr)], (err, res) => {
          if (err) {
            console.log("error: ", err);
          }
          else {
            console.log("new record inserted");
          }
        });
      } else {
        let bowler_data = [];
        bowler_data = reslt;
        bowler_data[0].statistics = [...JSON.parse(bowler_data[0].statistics), ...stats_arr];
        sql.query("UPDATE CRICONN_BOWLER SET ? WHERE player_id =?", [{ statistics: JSON.stringify(bowler_data[0].statistics) }, plyer_id], (err, res) => {
          if (err) {
            console.log("error: ", err);
          }
          else {
            console.log("old record updated");
          }
        });
      }

    });
  }
}
EditMatch.setMatchStatus = (match_id, tour_id, match_status, result) => {
  sql.query("UPDATE CRICONN_MATCHES SET ? WHERE match_id=? and tour_id=?", [{ match_status: match_status }, match_id, tour_id], (err, res) => {
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

module.exports = EditMatch;
