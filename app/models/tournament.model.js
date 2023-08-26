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

Tournament.addNewTournament = (tour_id, tour_name, current_season, creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date, result) => {
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
              sql.query("INSERT INTO  CRICONN_TOURNAMENTS (tour_id, tour_name, tour_unq_id,	creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date,	year,	season) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [tour_ID, tour_name, uniqueTournamentId,	creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date,	tour_year,	tour_season], (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }
                else {
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
        sql.query("INSERT INTO  CRICONN_TOURNAMENTS (tour_id, tour_name, tour_unq_id,	creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date,	year,	season) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [tour_ID, tour_name, uniqueTournamentId,	creator_mobile,	creator_id,	tour_banner,	tour_logo,	squad_limit,	place,	ground_id,	tour_type,	tour_category,	pitch_type,	ball_type,	start_date,	end_date,	tour_year,	tour_season], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          else {
            result(null, res);
            return;
          }
        });
      }
      else {
        result({ kind: "not_found" }, null);
      }
    });
  }
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }
  //   else {
  //     var get = { TournamentName: tournament };
  //     sql.query('SELECT * FROM maintournaments WHERE ? ', get, (err, res) => {
  //       if (err) {
  //         console.log("error: ", err);
  //         result(err, null);
  //         return;
  //       }
  //       else if (res.length) {
  //         var mainTournamentid = res[0].mainTournamentid;
  //         var tournamentState = "ongoing";
  //         var decOne = "Yes";
  //         var uniqueTournamentId = mainTournamentid+tourUnqId;
  //         sql.query("INSERT INTO  tournaments (Season,Year,organisername,Type,Place,Ground,TournamentState,tournament_type,Ball_type,Bowling_type,Squad_limit,declare_one,No_of_Groups,mainTournamentid,startdate,enddate,tourUnqId,subAdName,subAdId) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [season, year, organiser, tournamentType, place, ground, tournamentState, tourType, ballType, bowlingType, squadlimit, decOne, noOfGroups, mainTournamentid, startDate, endDate, uniqueTournamentId, subAdName, subAdId], (err, res) => {
  //           if (err) {
  //             console.log("error: ", err);
  //             result(err, null);
  //             return;
  //           }
  //           else {
  //             result(null, res);
  //             return;
  //           }
  //         });
  //       }
  //       else {
  //         result({ kind: "not_found" }, null);
  //       }
  //     });
  //   }
  // });
};
module.exports = Tournament;