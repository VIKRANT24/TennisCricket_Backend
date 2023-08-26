const sql = require("./db.js");

// constructor
const MatchStatistics = function () {
};

MatchStatistics.fetchTournamentBatting = (tourid, result) => {
    sql.query("SELECT Match_number,`Match_Inns`,`Teamid`, `WicketNo`,`FallAtScore`,`FallAtOver`,`Pid`,`Out_Details`,`Out_by_fielder1`,`Out_by_fielder2`,`Out_by_bowler`,`Runs`,`Bowls_Faced`,`Fours`,`Sixes`,round(`SR`,2) as SR FROM `match_batting_innings` WHERE `Tournamentid`= ? order by Match_Inns, cast(`Batting_order_num` AS UNSIGNED)", [tourid], (err, res) => {
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

MatchStatistics.fetchTournamentBolwing = (tourid, result) => {
    sql.query("SELECT Match_number,`Match_Inns`,`Teamid`,`pid`,`Overs`,`Maiden`,`Runs`,`wickets`,`Economy`,`Dot_Balls`,`Fours`,`Sixes`,`wide`,`noball` FROM `match_bowling_innings` WHERE `Tournamentid`= ? order by `Match_Inns`,cast(`Bowling_order_num` AS UNSIGNED)", [tourid], (err, res) => {
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

MatchStatistics.fetchTournamentPartnership = (tourid, result) => {
    sql.query("SELECT Match_number,`Match_Inns`,`teamid`,`For_Wkt`,`Runs`,`InBalls`,`out_details`,`PartnerID1`,`PartnerID2`,`OppositionTeam`,`PartnerID1_Runs`,`PartnerID1_Balls`,`PartnerID2_Runs`,`PartnerID2_Balls` FROM `partnerships` WHERE `Tournamentid`= ? order by cast(`For_Wkt` AS UNSIGNED),`Match_Inns`", [tourid], (err, res) => {
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

MatchStatistics.fetchFastestFiftyHundred = (tourid, result) => {
    sql.query("SELECT * FROM `fastest50100` WHERE `Tournamentid`= ?", [tourid], (err, res) => {
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

MatchStatistics.fetchTournamentMostRuns = (tourid, result) => {
  sql.query("SELECT PID,COUNT(`Match_number`) as matches, SUM(Runs) as run, MAX(Runs) as highScore, pl.playername as playerName, tm.teamname as teamName FROM match_batting_innings as bt INNER JOIN players as pl ON bt.PID = pl.playerid INNER JOIN teams tm ON tm.Teamid = bt.Teamid WHERE bt.Tournamentid=? GROUP BY `PID` ORDER BY run DESC LIMIT 0,10", [tourid], (err, res) => {
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
module.exports = MatchStatistics;
//SELECT pl.playername as playerName, tm.teamname as teamName, mb.`PID`, SUM(Runs) as run, COUNT(`Match_number`) as matches, SUM(Runs)/COUNT(`Match_number`) as AVG FROM `match_batting_innings` AS mb INNER JOIN players AS pl ON mb.PID=pl.playerid INNER JOIN teams AS tm ON mb.Teamid=tm.teamid WHERE mb.Tournamentid='4' GROUP BY `PID` ORDER BY run DESC LIMIT 0,10
//SELECT pl.playername as playerName, tm.teamname as teamName, SUM(Runs) as run FROM `match_batting_innings` AS mb INNER JOIN players AS pl ON mb.PID=pl.playerid INNER JOIN teams AS tm ON mb.Teamid=tm.teamid WHERE mb.Tournamentid='4' GROUP BY `PID` ORDER BY run DESC LIMIT 0,10
//SELECT bt.Runs, bt.Bowls_Faced, tm.teamname, bt.Teamid, bt.Match_number FROM match_batting_innings AS bt INNER JOIN teams AS tm ON bt.Teamid= tm.teamid WHERE bt.Tournamentid='4' ORDER BY bt.Runs DESC LIMIT 0,10
//SELECT * FROM match_batting_innings WHERE `Tournamentid`='24' ORDER BY Runs DESC LIMIT 0,10
//SELECT * FROM match_batting_innings AS bt INNER JOIN match_details AS md ON bt.Match_number= md.Match_number INNER JOIN teams AS tm ON tm.teamid=md.Toss_Win WHERE bt.Tournamentid='24' ORDER BY Runs DESC LIMIT 0,10
//SELECT bt.Runs, bt.Bowls_Faced, (SELECT teamname FROM teams WHERE teamid = md.Batting_first) as BatFirstName, (SELECT teamname FROM teams WHERE teamid = md.BatSecond) as BatSecondName FROM match_batting_innings AS bt INNER JOIN match_details AS md ON bt.Match_number= md.Match_number INNER JOIN teams AS tm ON tm.teamid=md.Toss_Win WHERE bt.Tournamentid='24' ORDER BY Runs DESC LIMIT 0,10