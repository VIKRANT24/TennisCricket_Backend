const sql = require("./db.js");

// constructor
const EditMatch = function () {
};

EditMatch.fetchAllMatchDetails = (tourid, result) => {

  sql.query("SELECT (SELECT teamname FROM teams WHERE teamid = MD.`Batting_first`) as BatFirstName, (SELECT teamname FROM teams WHERE teamid = MD.`BatSecond`) as BatSecondName, MD.`Match_number`,'2nd' as Inning,`Toss_Win`,`Batting_first` as BatFirst,BatSecond,`Overs` as totalovers,matchState,Groupname,`MatchStartDate`,`MatchEndDate`,FI.Scores as FIScore,FI.wickets as FIWickets,FI.Overscompleted as FIOvers,SI.Scores as SIScore,SI.wickets as SIWickets,SI.Overscompleted as SIOvers,`Winner`,`Win_Margin`,`MatchFormat`,concat(FI.Scores,'|',FI.wickets,'|',FI.Overscompleted,'|',FI.bye,'|',FI.legbyes,'|',FI.wide,'|',FI.noball,'|',FI.penalty,'|',FI.didnotbat,'|',FI.teamsquad) as FI_IngData,concat(SI.Scores,'|',SI.wickets,'|',SI.Overscompleted,'|',SI.bye,'|',SI.legbyes,'|',SI.wide,'|',SI.noball,'|',SI.penalty,'|',SI.didnotbat,'|',SI.teamsquad) as SI_IngData,`POM`FROM `match_details` as MD inner join match_teaminningsdetails as FI ON MD.`Match_number`=FI.Match_number and MD.`Tournamentid`=FI.Tournamentid and MD.`Batting_first`=FI.Teamid inner join match_teaminningsdetails as SI ON MD.`Match_number`=SI.Match_number and MD.`Tournamentid`=SI.Tournamentid and MD.`BatSecond`=SI.Teamid Where MD.`Tournamentid`=?", [tourid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      sql.query("SELECT listmatches.*,status, t1.teamname as team1name, t2.teamname as team2name from listmatches INNER JOIN teams AS t1 ON t1.teamid=listmatches.team1 INNER JOIN teams AS t2 ON t2.teamid=listmatches.team2 where tournament_id=?", [tourid], (err, res1) => {
        if (err) {
          console.log("error: ", err);
          result(null, res);
          return;
        }
        if (res1.length) {
          var result1 = res.concat(res1);
          result(null, result1);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    }
    // result({ kind: "not_found" }, null);
  });
};

EditMatch.insertMatch = (matchkey, team1, team2, format, status, start_date, overs, match_state, tournament_id, result) => {
  var get = { matchkey: matchkey };
  sql.query('SELECT * FROM listmatches WHERE ? ', get, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result({ kind: "This match is already present" }, null);
      return;
    }
    else {
      sql.query("INSERT into listmatches (team1, team2, format, status, start_date, overs, match_state, matchkey,tournament_id) values (?,?,?,?,?,?,?,?,?)", [team1, team2, format, status, start_date, overs, match_state, matchkey, tournament_id], (err, res) => {
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
