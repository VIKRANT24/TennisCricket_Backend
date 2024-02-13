const sql = require("./db.js");

// constructor
const Player = function () {
};


Player.addEditPlayer = (player_name, player_mobile, player_logo, player_place, player_email, player_dob, tour_id, team_id, is_selected, tag, result) => {
  var get = { player_mobile: player_mobile };
  if (tag == "add") {
    sql.query('SELECT * FROM CRICONN_PLAYERS WHERE ? ', get, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result({ kind: "Mobile number already exist" }, null);
        return;
      }
      else {
        sql.query("INSERT INTO CRICONN_PLAYERS (player_name,	player_mobile,	player_logo,	player_place, player_email, player_dob) VALUES (?,?,?,?,?,?)", [player_name, player_mobile, player_logo, player_place, player_email, player_dob], (err1, res1) => {
          if (err1) {
            console.log("error: ", err1);
            result(err1, null);
            return;
          }
          else {
            if (res1.insertId != null && res1.insertId != undefined && res1.insertId != 0) {
              var playerID = res1.insertId
              var playerUnqID = player_name + res1.insertId
              sql.query("UPDATE CRICONN_PLAYERS SET ? WHERE player_id =?", [{ player_unqid: playerUnqID }, playerID], (err2, res2) => {
                if (err2) {
                  console.log("error: ", err2);
                  result(err2, null);
                  return;
                }
                else {
                  sql.query("INSERT INTO CRICONN_PLAYER_DETAILS (tour_id, team_id, player_id,	is_selected) VALUES (?,?,?,?)", [tour_id, team_id, playerID, is_selected], (err3, res3) => {
                    if (err3) {
                      console.log("error: ", err3);
                      result(err3, null);
                      return;
                    } else {
                      console.log(res3.insertId);
                      result(null, []);
                      return;
                    }

                  })
                }
              });
            } else {
              result("please try after sometime", null);
              return;
            }
          }
        });
      }
    });
  }
  else {
    sql.query('SELECT * FROM CRICONN_PLAYERS WHERE playermobile = ? AND playerid <> ?', [playermobile, playerid], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result({ kind: "Mobile number already exist" }, null);
        return;
      }
      else {
        sql.query("UPDATE CRICONN_PLAYERS SET ? WHERE playerid =?", [{ playername: playername, imgdata: "", playerrole: playerrole, playermobile: playermobile, email: email, batting: batting, bowling: bowling, dob: dob, city: city, state: state, country: country }, playerid], (err, res) => {
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
};

Player.fetchPlayerList = (playername, result) => {
  if (playername == "" || playername == undefined || playername == null) {
    sql.query("SELECT * FROM CRICONN_PLAYERS ORDER BY player_id DESC", (err, res) => {
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
  }
  else {
    sql.query("SELECT * FROM CRICONN_PLAYERS WHERE playername =? ORDER BY player_id DESC", [playername], (err, res) => {
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
  }
};

Player.searchPlayers = (search_text, result) => {
  sql.query("SELECT * FROM CRICONN_PLAYERS where player_name LIKE ? || player_mobile LIKE ?", ['%' + search_text + '%', '%' + search_text + '%'], function (err, results) {
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

Player.fetchPlayerTeams = (player_id, result) => {
  sql.query("SELECT CT.team_name FROM CRICONN_PLAYER_DETAILS as CPD inner join CRICONN_TEAMS as CT on CPD.team_id = CT.team_id WHERE CPD.player_id=?", [player_id], (err, res) => {
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

Player.addBatter = (player_id, match_id, tournament_id, runs, four, six, ball_faced, out_type, out_by, ground_id, place_id, result) => {
  sql.query("INSERT INTO CRICONN_BATTER (player_id, match_id, tournament_id, runs, four, six, ball_faced, out_type, out_by, ground_id, place_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [player_id, match_id, tournament_id, runs, four, six, ball_faced, out_type, out_by, ground_id, place_id], (err1, res1) => {
    if (err1) {
      console.log("error: ", err1);
      result(err1, null);
      return;
    } else {
      result(null, []);
      return;
    }

  })
}

Player.addBowler = (player_id, match_id, tournament_id, runs, balls, maidens, wickets, ground_id, place_id, result) => {
  sql.query("INSERT INTO CRICONN_BOWLER (player_id, match_id, tournament_id, runs, balls, maidens, wickets, ground_id, place_id) VALUES (?,?,?,?,?,?,?,?,?,?)", [player_id, match_id, tournament_id, runs, balls, maidens, wickets, ground_id, place_id], (err1, res1) => {
    if (err1) {
      console.log("error: ", err1);
      result(err1, null);
      return;
    } else {
      result(null, []);
      return;
    }

  })
}

Player.fetchPlayerStat = (player_id, result) => {
  var bowler_stats = {};
  var batsman_stats = {};
  var player_stats = {};
  sql.query("SELECT * FROM CRICONN_BOWLER WHERE player_id =?", [player_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      bowler_stats = {"player_id":res[0].player_id, "statistics":JSON.parse(res[0].statistics)};
    }
    sql.query("SELECT * FROM CRICONN_BATTER WHERE player_id =?", [player_id], (err1, res1) => {
      if (err1) {
        console.log("error: ", err1);
        result(err1, null);
        return;
      }
      if (res1.length) {
        batsman_stats = {"player_id":res1[0].player_id, "statistics":JSON.parse(res1[0].statistics)};
      }
      player_stats = {"batting_record":batsman_stats,"bowling_record":bowler_stats};
      result(null, player_stats);
    });
  });
}
module.exports = Player;