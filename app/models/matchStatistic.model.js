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

module.exports = MatchStatistics;
