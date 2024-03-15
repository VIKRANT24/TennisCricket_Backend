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

MatchStatistics.fetchTournamentStats = (tour_id, result) => {
  var get = { tour_id: tour_id };
  sql.query('SELECT * FROM CRICONN_MATCH_RECORDS WHERE ? ', get, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      let batterArray = [];
      let bowlerArray = [];
      for (let i = 0; i < res.length; i++) {
        let batter1 = [];
        let bowler1 = [];
        if (JSON.parse(res[i].match_score).match.inning1 != null && JSON.parse(res[i].match_score).match.inning1 != undefined) {
          batter1 = JSON.parse(res[i].match_score).match.inning1.batters;
          bowler1 = JSON.parse(res[i].match_score).match.inning1.bowlers;
        }
        let batter2 = [];
        let bowler2 = [];
        if (JSON.parse(res[i].match_score).match.inning2 != null && JSON.parse(res[i].match_score).match.inning2 != undefined) {
          batter2 = JSON.parse(res[i].match_score).match.inning2.batters;
          bowler2 = JSON.parse(res[i].match_score).match.inning2.bowlers;
        }
        let batters = []
        if (batter1.length > 0 && batter2.length > 0) {
          batters = [...batter1, ...batter2];
        } else if (batter1.length > 0) {
          batters = batter1;
        } else if (batter2.length > 0) {
          batters = batter2;
        }
        batters.filter((item) => {
          let index = bowlerArray.findIndex(x => x.id === item.id);
          if (index != -1) {
            let existingRecord = batterArray[index];
            let newRecord = { "id": item.id, "ball": item.ball + existingRecord.ball, "four": item.four + existingRecord.four, "six": item.six + existingRecord.six, "run": item.run + existingRecord.run, "name": item.name }
            batterArray[index] = newRecord;
          } else {
            let newRecord = { "id": item.id, "ball": item.ball, "four": item.four, "six": item.six, "run": item.run, "name": item.name };
            batterArray.push(newRecord);
          }
        })
        let bowlers = [];
        if (bowler1.length > 0 && bowler2.length > 0) {
          bowlers = [...bowler1, ...bowler2];
        } else if (bowler1.length > 0) {
          bowlers = bowler1;
        } else if (bowler2.length > 0) {
          bowlers = bowler2;
        }
        bowlers.filter((item) => {
          let index = bowlerArray.findIndex(x => x.id === item.id);
          if (index != -1) {
            let existingRecord = bowlerArray[index];
            let newRecord = { "id": item.id, "name": item.name, "over": item.over + existingRecord.over, "wicket": item.wicket + existingRecord.wicket, "run": item.run + existingRecord.run }
            bowlerArray[index] = newRecord;
          } else {
            let newRecord = { "id": item.id, "name": item.name, "over": item.over, "wicket": item.wicket, "run": item.run }
            bowlerArray.push(newRecord);
          }
        })
      }
      result(null, { "batters": batterArray, "bowlers": bowlerArray });
    }
  });
}

MatchStatistics.fetchTournamentOverview = (tour_id, match_id, result) => {
  if (match_id == null || match_id == undefined) {
    sql.query("SELECT match_id, tour_id, place, match_status, date_time, (Select team_name from CRICONN_TEAMS where team_id = CM.team_one) as team1_name, (Select team_name from CRICONN_TEAMS where team_id = CM.team_two) as team2_name, (Select ground_name from CRICONN_GROUNDS where id = CM.ground_id) as ground_name, (Select match_score from CRICONN_MATCH_RECORDS where match_id = CM.match_id) as match_score FROM  CRICONN_MATCHES AS CM where tour_id=?", [tour_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      else {
        if (res.length) {
          let data = [];
          let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          for (let i = 0; i < res.length; i++) {
            let no = res[i].match_id;
            let JSONScore = {};
            let currentRunStack = [];
            let currentStriker = {};
            let currentNStriker = {};
            let currentBowler = {};
            let inning1 = {};
            let inning2 = {};
            let place = res[i].place;
            let ground = res[i].ground_name;
            let team_one = res[i].team1_name;
            let team_two = res[i].team2_name;
            let tossWon = "";
            let electedTo = "";
            let date = res[i].date_time.split(" ")[0];
            let time = res[i].date_time.split(" ")[1] + " " + res[i].date_time.split(" ")[2];
            let formattedDate = ""
            for (let j = 0; j < months.length; j++) {
              if (j == date.split("/")[1]) {
                formattedDate = date.split("/")[0] + " " + months[j] + " " + date.split("/")[2]
                break;
              }
            }
            if (res[i].match_score != null && res[i].match_score != undefined && res[i].match_score != "") {
              JSONScore = JSON.parse(res[i].match_score);
              if (JSONScore.match.inning1 != null && JSONScore.match.inning1 != undefined) {
                inning1 = JSONScore.match.inning1;
                inning1.team_name = JSONScore.scoring_team;
              } else {
                inning1 = {}
              }
              if (JSONScore.match.inning2 != null && JSONScore.match.inning2 != undefined) {
                inning2 = JSONScore.match.inning2;
                inning2.team_name = JSONScore.chessing_team;
              } else {
                inning2 = {}
              }
              if (JSONScore.currentRunStack != null && JSONScore.currentRunStack != undefined) {
                currentRunStack = JSONScore.currentRunStack;
              } else {
                currentRunStack = [];
              }
              if (JSONScore.batter1 != null && JSONScore.batter1 != undefined) {
                currentStriker = JSONScore.batter1;
              } else {
                currentStriker = {};
              }
              if (JSONScore.batter2 != null && JSONScore.batter2 != undefined) {
                currentNStriker = JSONScore.batter2;
              } else {
                currentNStriker = {};
              }
              if (JSONScore.currentBowlerData != null && JSONScore.currentBowlerData != undefined) {
                currentBowler = JSONScore.currentBowlerData;
              } else {
                currentBowler = {};
              }
              if (JSONScore.tossWon != null && JSONScore.tossWon != undefined) {
                tossWon = JSONScore.tossWon;
              } else {
                tossWon = ""
              }
              if (JSONScore.electedTo != null && JSONScore.electedTo != undefined) {
                electedTo = JSONScore.electedTo;
              } else {
                electedTo = ""
              }
              if (tossWon == "" || tossWon == null || tossWon == undefined) {
                tossWon = ""
              }
            } else {
              JSONScore = {}
            }
            data.push({ "no": no, "vs": team_one + " Vs " + team_two, "teamA": team_one, "teamB": team_two, "tossWon":tossWon, "electedToBat":electedTo, "date": formattedDate, "starts": time, "ground": ground, "place": place, "currentRunStack": currentRunStack, "currentStriker": currentStriker, "currentNStriker": currentNStriker, "currentBowler": currentBowler, "inning1": inning1, "inning2": inning2})
          }
          let obj = { "tour": { "id": tour_id, "matches": data } }
          result(null, obj);
        } else {
          result(null, []);
        }
      }
    });
  } else {
    sql.query("SELECT match_id, tour_id, place, match_status, date_time, (Select team_name from CRICONN_TEAMS where team_id = CM.team_one) as team1_name, (Select team_name from CRICONN_TEAMS where team_id = CM.team_two) as team2_name, (Select ground_name from CRICONN_GROUNDS where id = CM.ground_id) as ground_name, (Select match_score from CRICONN_MATCH_RECORDS where match_id = CM.match_id) as match_score FROM  CRICONN_MATCHES AS CM where tour_id=? AND match_id=?", [tour_id, match_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      else {
        if (res.length) {
          let data = [];
          let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          for (let i = 0; i < res.length; i++) {
            let no = res[i].match_id;
            let JSONScore = {};
            let currentRunStack = [];
            let currentStriker = {};
            let currentNStriker = {};
            let currentBowler = {};
            let inning1 = {};
            let inning2 = {};
            let place = res[i].place;
            let ground = res[i].ground_name;
            let team_one = res[i].team1_name;
            let team_two = res[i].team2_name;
            let tossWon = "";
            let electedTo = "";
            let electedToBat = "";
            let date = res[i].date_time.split(" ")[0];
            let time = res[i].date_time.split(" ")[1] + " " + res[i].date_time.split(" ")[2];
            let formattedDate = ""
            for (let j = 0; j < months.length; j++) {
              if (j == date.split("/")[1]) {
                formattedDate = date.split("/")[0] + " " + months[j] + " " + date.split("/")[2]
                break;
              }
            }
            if (res[i].match_score != null && res[i].match_score != undefined && res[i].match_score != "") {
              JSONScore = JSON.parse(res[i].match_score);
              if (JSONScore.match.inning1 != null && JSONScore.match.inning1 != undefined) {
                inning1 = JSONScore.match.inning1;
                inning1.team_name = JSONScore.scoring_team;
              } else {
                inning1 = {}
              }
              if (JSONScore.match.inning2 != null && JSONScore.match.inning2 != undefined) {
                inning2 = JSONScore.match.inning2;
                inning2.team_name = JSONScore.chessing_team;
              } else {
                inning2 = {}
              }
              if (JSONScore.currentRunStack != null && JSONScore.currentRunStack != undefined) {
                currentRunStack = JSONScore.currentRunStack;
              } else {
                currentRunStack = [];
              }
              if (JSONScore.batter1 != null && JSONScore.batter1 != undefined) {
                currentStriker = JSONScore.batter1;
              } else {
                currentStriker = {};
              }
              if (JSONScore.batter2 != null && JSONScore.batter2 != undefined) {
                currentNStriker = JSONScore.batter2;
              } else {
                currentNStriker = {};
              }
              if (JSONScore.currentBowlerData != null && JSONScore.currentBowlerData != undefined) {
                currentBowler = JSONScore.currentBowlerData;
              } else {
                currentBowler = {};
              }
              if (JSONScore.tossWon != null && JSONScore.tossWon != undefined) {
                tossWon = JSONScore.tossWon;
              } else {
                tossWon = ""
              }
              if (JSONScore.electedTo != null && JSONScore.electedTo != undefined) {
                electedTo = JSONScore.electedTo;
              } else {
                electedTo = ""
              }
              if (tossWon == "" || tossWon == null || tossWon == undefined) {
                tossWon = ""
              }
            } else {
              JSONScore = {}
            }
            data.push({ "no": no, "vs": team_one + " Vs " + team_two, "teamA": team_one, "teamB": team_two, "tossWon":tossWon, "electedToBat":electedTo, "date": formattedDate, "starts": time, "ground": ground, "place": place, "currentRunStack": currentRunStack, "currentStriker": currentStriker, "currentNStriker": currentNStriker, "currentBowler": currentBowler, "inning1": inning1, "inning2": inning2})
          }
          let obj = { "tour": { "id": tour_id, "matches": data } }
          result(null, obj);
        } else {
          result(null, []);
        }
      }
    });
  }

}

module.exports = MatchStatistics;
