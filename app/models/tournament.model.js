const sql = require("./db.js");

// constructor
const Tournament = function () {
};

Tournament.deleteTournament = (tourid, result) => {
  sql.query(`delete from commentry where Tournamentid=${tourid};delete from fastest50100 where Tournamentid=${tourid};delete from match_batting_innings where Tournamentid=${tourid};delete from match_bowling_innings where Tournamentid=${tourid};delete from match_details where Tournamentid=${tourid};delete from match_teaminningsdetails where Tournamentid=${tourid};delete from partnerships where Tournamentid=${tourid};delete from teams where tournamentid=${tourid};delete from teamsquad where tournamentid=${tourid};delete from tournaments where Tournamentid=${tourid}`, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], function (err, results) {
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

Tournament.addNewTournament = (tour_id, tour_name, current_season, creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date, umpire_ids, commentator_ids, result) => {
  if (tour_id == 0 || tour_id == "" || tour_id == undefined || tour_id == null) {
    sql.query("INSERT INTO CRICONN_MAINTOURNAMENT (tour_name,current_season) VALUES (?,?)", [tour_name, current_season], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      else {
        console.log(res.insertId);
        if (res.insertId != "" && res.insertId != undefined && res.insertId != null) {
          var get = { tour_id: res.insertId };
          sql.query('SELECT * FROM CRICONN_MAINTOURNAMENT WHERE ? ', get, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            else if (res.length) {
              var tour_ID = res[0].tour_id;
              var tour_season = res[0].current_season;
              var uniqueTournamentId = "CRICONN"+tour_ID+tour_season;
              var tour_year = start_date.toString().split("-")[0]; //2023-08-31
              sql.query("INSERT INTO  CRICONN_TOURNAMENTS (tour_id, tour_name, tour_unq_id,	creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date,	year,	season, commentator_ids, umpire_ids) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [tour_ID, tour_name, uniqueTournamentId,	creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date,	tour_year,	tour_season, commentator_ids, umpire_ids], (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }
                else {
                  setUmpireHistory(tour_ID,umpire_ids);
                  setCommentatorHistory(tour_ID,commentator_ids);
                  result(null, res);
                  return;
                }
              });
            }
            else {
              result({ kind: "not_found" }, null);
            }
          });
        } else {
          result({ kind: "Please try again" }, null);
        }
      }
    });
  }
  else {
    var get = { tour_id: tour_id };
    sql.query('SELECT * FROM CRICONN_MAINTOURNAMENT WHERE ? ', get, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      else if (res.length) {
        var tour_ID = res[0].tour_id;
        var tour_season = res[0].current_season;
        var uniqueTournamentId = "CRICONN"+tour_ID+tour_season;
        var tour_year = start_date.toString().split("-")[0]; //2023-08-31
        sql.query("UPDATE CRICONN_MAINTOURNAMENT SET current_season = ? WHERE tour_id = ?",[tour_season+1,tour_id], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          else{
            sql.query("INSERT INTO  CRICONN_TOURNAMENTS (tour_id, tour_name, tour_unq_id,	creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date,	year,	season, commentator_ids, umpire_ids) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [tour_ID, tour_name, uniqueTournamentId,	creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date,	tour_year,	tour_season+1, commentator_ids, umpire_ids], (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              else {
                setUmpireHistory(tour_ID,umpire_ids);
                setCommentatorHistory(tour_ID,commentator_ids);
                result(null, res);
                return;
              }
            });
          }
        })
      }
      else {
        result({ kind: "not_found" }, null);
      }
    });
  }
};

Tournament.fetchMyTournament = (user_id, result) => {
  var get = {creator_id: user_id };
  sql.query('SELECT * FROM CRICONN_TOURNAMENTS WHERE ? ORDER BY tour_id DESC', get, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else if (res.length) {
      result(null, res);
      return;
    }
    else {
      result({ kind: "not_found" }, null);
    }
  });
};

async function setUmpireHistory(tour_id, umpire_ids){
  var umpireData=umpire_ids.split(",");
  for(let i=0;i<umpireData.length;i++){
    sql.query("INSERT INTO  CRICONN_UMPIRE_HISTORY (tour_id, umpire_id) values (?,?)", [tour_id,umpireData[i]], (err, res) => {
      if(err){
        console.log(err);
      }else{
        console.log("Umpire history added");
      }
    })
  }
}

async function setCommentatorHistory(tour_id, commentator_ids){
  var commentatorData=commentator_ids.split(",");
  for(let i=0;i<commentatorData.length;i++){
    sql.query("INSERT INTO  CRICONN_COMMENTATOR_HISTORY (tour_id, commentator_id) values (?,?)", [tour_id,commentatorData[i]], (err, res) => {
      if(err){
        console.log(err);
      }else{
        console.log("Umpire history added");
      }
    })
}
}

module.exports = Tournament;