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
MatchStatistics.fetchMVP = (tour_id, match_id, result) => {
  sql.query('SELECT * FROM CRICONN_MATCH_RECORDS WHERE tour_id=? AND match_id=? ', [tour_id, match_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      let batter1Array = [];
      let bowlerTotalMVPPOintData1 = 0;
      if (res.length) {
        let batter1 = [];
        let bowler1 = [];
        let team1Balls = 0;
        let team1SR = 0;
        filderBaseWicketTlScore = 0;
        filderBaseWicketScore = 0;
        let maxOver = JSON.parse(res[0].match_score).maxOver ? JSON.parse(res[0].match_score).maxOver : 0;
        let baseRunsPerWkt = fetchBaseRunPerWicket(maxOver);
        if (JSON.parse(res[0].match_score).match.inning1 != null && JSON.parse(res[0].match_score).match.inning1 != undefined) {
          batter1 = JSON.parse(res[0].match_score).match.inning1.batters;
          bowler1 = JSON.parse(res[0].match_score).match.inning1.bowlers;
          let over = JSON.parse(res[0].match_score).match.inning1.overs ? JSON.parse(res[0].match_score).match.inning1.overs.toString().split(".")[0] : 0;
          let ball = JSON.parse(res[0].match_score).match.inning1.overs ? JSON.parse(res[0].match_score).match.inning1.overs.toString().split(".")[1] : 0;
          let runs = JSON.parse(res[0].match_score).match.inning1.runs;
          let totalPoint = 0;
          if (over == undefined || over == null) {
            over = "0";
          }
          if (ball == undefined || ball == null) {
            ball = "0";
          }
          team1Balls = team1Balls + ((Number(over) * 6) + Number(ball));
          team1SR = (runs * 100) / team1Balls;
          batter1.filter((item) => {
            let basicPoint = item.run / 10;
            let SRDifference = item.strikeRate - team1SR >= 0 ? 1 : -1;
            let bonusPoint = 0
            if (item.strikeRate > 0 && team1SR > 0) {
              bonusPoint = ((item.strikeRate / team1SR) * SRDifference * 0.04) * basicPoint;
            }
            totalPoint = basicPoint + bonusPoint;
            batter1Array.push({ "id": item.p_id, "name": item.name, "battingPoint": Number(totalPoint.toFixed(2)), "bowlingPoint": 0, "fieldingPoint": 0, "runs": item.run, "ballFaced": item.ball, "six": item.six, "four": item.four, "battingStrikeRate": item.strikeRate, "battingStatus": item.outReason, "wickets": 0, "isBallerPointAdded": false })
          })
          bowler1.filter((item) => {
            let wicketsData = item.wicketArray;
            if (wicketsData == undefined || wicketsData == null) {
              wicketsData = [];
            }
            let baseWicketScore = 0;
            let baseWicketTlScore = 0;
            let additionalWicketPoint = 0;
            let bowlerOver = item.over ? item.over.toString().split(".")[0] : 0;
            let overBalls = item.over ? item.over.toString().split(".")[1] : 0;
            let totalBalls = 0;
            let BowlerRuns = item.run ? item.run : 0;
            let bonusPoint = 0;
            let maidenOvrPoint = calculateMdnOvrPnt(maxOver, item.maiden ? item.maiden : 0)
            if (bowlerOver == undefined || bowlerOver == null) {
              bowlerOver = "0";
            }
            if (overBalls == undefined || overBalls == null) {
              overBalls = "0";
            }
            totalBalls = totalBalls + ((Number(bowlerOver) * 6) + Number(overBalls));
            let bowlerSR = 0;
            if (BowlerRuns > 0 && totalBalls > 0) {
              bowlerSR = (BowlerRuns / totalBalls) * 100;
            }
            if (Number(bowlerSR) <= Number(team1SR)) {
              bonusPoint = 1
            }
            if (wicketsData != undefined && wicketsData != null && wicketsData.length > 0) {
              if (wicketsData.length >= 3 && wicketsData.length < 5) {
                additionalWicketPoint = 0.5;
              }
              if (wicketsData.length >= 5 && wicketsData.length < 10) {
                additionalWicketPoint = 1;
              }
              if (wicketsData.length >= 10) {
                additionalWicketPoint = 1.5;
              }
              wicketsData.filter((wicketData) => {
                if (wicketData.order >= 1 && wicketData.order <= 4) {
                  baseWicketScore = baseRunsPerWkt / 10;
                } else if (wicketData.order >= 5 && wicketData.order <= 8) {
                  baseWicketScore = (baseRunsPerWkt * 80) / 1000;
                } else {
                  baseWicketScore = (baseRunsPerWkt * 60) / 1000;
                }
                baseWicketTlScore = Number(baseWicketTlScore) + Number(baseWicketScore);
              })
            }
            bowlerTotalMVPPOintData1 = Number(maidenOvrPoint) + Number(baseWicketTlScore) + Number(bonusPoint) + Number(additionalWicketPoint);
            let index = batter1Array.findIndex(x => x.id === Number(item.id));
            if (index != -1) {
              batter1Array[index].bowlingPoint = Number(bowlerTotalMVPPOintData1.toFixed(2));
              batter1Array[index].fieldingPoint = 0;
              batter1Array[index].wickets = wicketsData.length;
              batter1Array[index].isBallerPointAdded = true;
            } else {
              batter1Array.push({ "id": Number(item.id), "name": item.name, "battingPoint": 0, "bowlingPoint": Number(bowlerTotalMVPPOintData1.toFixed(2)), "fieldingPoint": 0, "runs": 0, "ballFaced": 0, "six": 0, "four": 0, "battingStrikeRate": 0, "battingStatus": "", "wickets": wicketsData.length ? wicketsData.length : 0, "isBallerPointAdded": true })
            }
          })
        }

      }
      console.log(batter1Array);
      let bowlerTotalMVPPOintData2 = 0;
      let batter2 = [];
      let bowler2 = [];
      let team2Balls = 0;
      let team2SR = 0;
      let fielderBonus = 0;
      filderBaseWicketTlScore = 0;
      filderBaseWicketScore = 0;
      let maxOver = JSON.parse(res[0].match_score).maxOver ? JSON.parse(res[0].match_score).maxOver : 0;
      let baseRunsPerWkt = fetchBaseRunPerWicket(maxOver);
      let fielderArray = [];
      if (JSON.parse(res[0].match_score).fielderArray != null && JSON.parse(res[0].match_score).fielderArray != undefined) {
        fielderArray = JSON.parse(res[0].match_score).fielderArray;
      }
      if (JSON.parse(res[0].match_score).match.inning2 != null && JSON.parse(res[0].match_score).match.inning2 != undefined) {
        batter2 = JSON.parse(res[0].match_score).match.inning2.batters;
        bowler2 = JSON.parse(res[0].match_score).match.inning2.bowlers;
        let over = JSON.parse(res[0].match_score).match.inning2.overs ? JSON.parse(res[0].match_score).match.inning2.overs.toString().split(".")[0] : 0;
        let ball = JSON.parse(res[0].match_score).match.inning2.overs ? JSON.parse(res[0].match_score).match.inning2.overs.toString().split(".")[1] : 0;
        let runs = JSON.parse(res[0].match_score).match.inning2.runs;
        let totalPoint = 0;
        if (over == undefined || over == null) {
          over = "0";
        }
        if (ball == undefined || ball == null) {
          ball = "0";
        }
        team2Balls = team2Balls + ((Number(over) * 6) + Number(ball));
        team2SR = (runs * 100) / team2Balls;
        batter2.filter((item) => {
          let basicPoint = item.run / 10;
          let SRDifference = item.strikeRate - team2SR >= 0 ? 1 : -1;
          let bonusPoint = 0
          if (item.strikeRate > 0 && team2SR > 0) {
            bonusPoint = ((item.strikeRate / team2SR) * SRDifference * 0.04) * basicPoint;
          }
          totalPoint = basicPoint + bonusPoint;
          let index = batter1Array.findIndex(x => x.id === Number(item.p_id));
          if (index != -1) {
            batter1Array[index].battingPoint = Number(totalPoint.toFixed(2));
          } else {
            batter1Array.push({ "id": item.p_id, "name": item.name, "battingPoint": Number(totalPoint.toFixed(2)), "bowlingPoint": 0, "fieldingPoint": 0, "runs": item.run, "ballFaced": item.ball, "six": item.six, "four": item.four, "battingStrikeRate": item.strikeRate, "battingStatus": item.outReason, "wickets": 0, "isBallerPointAdded": false })
          }
        })
        bowler2.filter((item) => {
          let wicketsData = item.wicketArray;
          if (wicketsData == undefined || wicketsData == null) {
            wicketsData = [];
          }
          let baseWicketScore = 0;
          let baseWicketTlScore = 0;
          let additionalWicketPoint = 0;
          let bowlerOver = item.over ? item.over.toString().split(".")[0] : 0;
          let overBalls = item.over ? item.over.toString().split(".")[1] : 0;
          let totalBalls = 0;
          let BowlerRuns = item.run ? item.run : 0;
          let bonusPoint = 0;
          let maidenOvrPoint = calculateMdnOvrPnt(maxOver, item.maiden ? item.maiden : 0)
          if (bowlerOver == undefined || bowlerOver == null) {
            bowlerOver = "0";
          }
          if (overBalls == undefined || overBalls == null) {
            overBalls = "0";
          }
          totalBalls = totalBalls + ((Number(bowlerOver) * 6) + Number(overBalls));
          let bowlerSR = 0;
          if (BowlerRuns > 0 && totalBalls > 0) {
            bowlerSR = (BowlerRuns / totalBalls) * 100;
          }
          if (Number(bowlerSR) <= Number(team2SR)) {
            bonusPoint = 1
          }
          if (wicketsData != undefined && wicketsData != null && wicketsData.length > 0) {
            if (wicketsData.length >= 3 && wicketsData.length < 5) {
              additionalWicketPoint = 0.5;
            }
            if (wicketsData.length >= 5 && wicketsData.length < 10) {
              additionalWicketPoint = 1;
            }
            if (wicketsData.length >= 10) {
              additionalWicketPoint = 1.5;
            }
            wicketsData.filter((wicketData) => {
              if (wicketData.order >= 1 && wicketData.order <= 4) {
                baseWicketScore = baseRunsPerWkt / 10;
              } else if (wicketData.order >= 5 && wicketData.order <= 8) {
                baseWicketScore = (baseRunsPerWkt * 80) / 1000;
              } else {
                baseWicketScore = (baseRunsPerWkt * 60) / 1000;
              }
              baseWicketTlScore = Number(baseWicketTlScore) + Number(baseWicketScore);
            })
          }
          bowlerTotalMVPPOintData2 = Number(maidenOvrPoint) + Number(baseWicketTlScore) + Number(bonusPoint) + Number(additionalWicketPoint);
          let index = batter1Array.findIndex(x => x.id === Number(item.id));
          if (index != -1) {
            batter1Array[index].bowlingPoint = Number(bowlerTotalMVPPOintData2.toFixed(2));
            batter1Array[index].wickets = wicketsData.length;
            batter1Array[index].isBallerPointAdded = true;
          } else {
            batter1Array.push({ "id": Number(item.id), "name": item.name, "battingPoint": 0, "bowlingPoint": Number(bowlerTotalMVPPOintData2.toFixed(2)), "fieldingPoint": 0, "runs": 0, "ballFaced": 0, "six": 0, "four": 0, "battingStrikeRate": 0, "battingStatus": "", "wickets": wicketsData.length ? wicketsData.length : 0, "isBallerPointAdded": true })
          }
        })
        fielderArray.filter((item) => {
          if (item.type == "runout" || item.type == "stumped") {        // fielder get full points.
            if (item.order >= 1 && item.order <= 4) {
              filderBaseWicketScore = baseRunsPerWkt / 10;
              fielderBonus = (baseRunsPerWkt - item.batter_run) * 0.02;
            } else if (item.order >= 5 && item.order <= 8) {
              filderBaseWicketScore = (baseRunsPerWkt * 80) / 1000;
              fielderBonus = (((baseRunsPerWkt * 80) / 100) - item.batter_run) * 0.02;
            } else {
              filderBaseWicketScore = (baseRunsPerWkt * 60) / 1000;
              fielderBonus = (((baseRunsPerWkt * 60) / 100) - item.batter_run) * 0.02;
            }
          } else if (item.type == "caught") {  // fielder get 20% and bowler get 80% points
            fielderBonus = 0;
            if (item.order >= 1 && item.order <= 4) {
              filderBaseWicketScore = (baseRunsPerWkt / 1000) * 20;
            } else if (item.order >= 5 && item.order <= 8) {
              let score = (baseRunsPerWkt * 80) / 1000;
              filderBaseWicketScore = (score * 20) / 100;
            } else {
              let score = (baseRunsPerWkt * 60) / 1000;
              filderBaseWicketScore = (score * 20) / 100;
            }
            let index = batter1Array.findIndex(x => x.id === Number(item.b_id));
            if (index != -1) {
              if (batter1Array[index].isBallerPointAdded == true) {
                batter1Array[index].bowlingPoint = Number((batter1Array[index].bowlingPoint - filderBaseWicketScore).toFixed(2));
              }
            }
          } else {                           // bowler get full points.
            fielderBonus = 0;
            filderBaseWicketScore = 0;
          }
          filderBaseWicketTlScore = Number(filderBaseWicketScore) + Number(fielderBonus);
          let index = batter1Array.findIndex(x => x.id === Number(item.fielder_id1 ? item.fielder_id1 : item.fielder_id));
          if (index != -1) {
            batter1Array[index].fieldingPoint = Number(filderBaseWicketTlScore.toFixed(2));
          } else {
            batter1Array.push({ "id": Number(item.fielder_id1 ? item.fielder_id1 : item.fielder_id), "name": item.name, "battingPoint": 0, "bowlingPoint": 0, "fieldingPoint": Number(filderBaseWicketTlScore.toFixed(2)), "runs": 0, "ballFaced": 0, "six": 0, "four": 0, "battingStrikeRate": 0, "battingStatus": "", "wickets": 0, "isBallerPointAdded": false })
          }
        })
      }

      console.log(batter1Array);
      batter1Array.filter((item) => {
        item.point = Number((item.battingPoint + item.bowlingPoint + item.fieldingPoint).toFixed(2));
        delete item.isBallerPointAdded;
        delete item.runs;
        delete item.ballFaced;
        delete item.six;
        delete item.four;
        delete item.battingStrikeRate;
        delete item.battingStatus;
        delete item.wickets;
      });
      result(null, { "MVPPointsData": batter1Array.sort((a,b) =>{ a.point - b.point }) });
    }
  });
}

function fetchBaseRunPerWicket(overs) {
  var baseRunsPerWkt = 0;
  if (overs > 0 && overs <= 7) {
    baseRunsPerWkt = 12;
  } else if (overs > 7 && overs <= 12) {
    baseRunsPerWkt = 14;
  } else if (overs > 12 && overs <= 16) {
    baseRunsPerWkt = 16;
  } else if (overs > 16 && overs <= 20) {
    baseRunsPerWkt = 18;
  } else if (overs > 20 && overs <= 26) {
    baseRunsPerWkt = 20;
  } else if (overs > 26 && overs <= 40) {
    baseRunsPerWkt = 22;
  } else if (overs > 40 && overs <= 50) {
    baseRunsPerWkt = 25;
  } else if (overs > 50 && overs <= 99) {
    baseRunsPerWkt = 27;
  }
  return baseRunsPerWkt;
}

function calculateMdnOvrPnt(overs, mdnOvrs) {
  if (mdnOvrs > 0) {
    var MdnOvrPnt = 0;
    if (overs > 0 && overs <= 7) {
      MdnOvrPnt = mdnOvrs;
    } else if (overs > 7 && overs <= 26) {
      MdnOvrPnt = mdnOvrs / 2;
    } else if (overs > 26 && overs <= 50) {
      MdnOvrPnt = mdnOvrs / 3;
    } else if (overs > 50 && overs <= 99) {
      MdnOvrPnt = mdnOvrs / 3;
    }
    return Math.floor(MdnOvrPnt);
  } else {
    return 0;
  }
}
module.exports = MatchStatistics;
