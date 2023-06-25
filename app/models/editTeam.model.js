const sql = require("./db.js");

// constructor
const EditTeam = function () {
};

EditTeam.fetchTournamentPlayers = (tourid,result) => {

    sql.query("SELECT A.playerid,B.playername,B.playerrole,B.playermobile,B.`imgpath`,A.teamid,A.playing11 FROM `teamsquad` as A inner join players as B on A.playerid=B.playerid WHERE  tournamentid=?",[tourid], (err, res) => {
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
EditTeam.getTournamentTeam = (tourid, result) => {
    sql.query(`SELECT * FROM teams where tournamentid=${tourid}`, [1], function(err, results) {
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
  EditTeam.getTournamentTeamSquad = (tourid, teamid, result) => {
    sql.query("SELECT teamid,tournamentid,T.playerid,playing11,P.playername,P.playerrole,P.playermobile FROM `teamsquad` as T inner join players as P on T.playerid=P.playerid  where tournamentid=? and teamid=?",[tourid, teamid], function(err, results) {
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
  EditTeam.insertTeam = (tourid, teamname, logopath, teamcolor, textcolor, result) => {
    var get = { teamname: teamname };
    sql.query('SELECT * FROM teams WHERE ? ', get, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result({ kind: "Team already exist" }, null);
        return;
      }
      else {
        sql.query("INSERT INTO teams (teamname,tournamentid,logopath,teamcolor,textcolor) VALUES (?,?,?,?,?)", [teamname,tourid,logopath,teamcolor,textcolor], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          else {
            console.log(result.insertId);
            result(null, res.insertId);
            return;
          }
        });
      }
    });
  };
  EditTeam.addPlayerToSquad = (tourid, teamid, playerid, playing11, result) => {
    sql.query('SELECT * FROM teamsquad WHERE teamid = ? AND playerid = ?', [teamid,playerid], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result({ kind: "player already exist" }, null);
        return;
      }
      else {
        sql.query("INSERT INTO teamsquad (tournamentid, teamid, playerid, playing11) VALUES (?,?,?,?)", [tourid, teamid, playerid, playing11], (err, res) => {
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

EditTeam.addPlayersToSquad = (playerList, result) => {
  // sql.query("INSERT INTO teamsquad (tournamentid, teamid, playerid, playing11) VALUES ? WHERE   NOT EXISTS ( SELECT playerid FROM teamsquad WHERE teamid = ?); ", [playerList], (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(err, null);
  //       return;
  //     }
  //     else {
  //       result(null, []);
  //       return;
  //     }
  //   });
};
// EditTeam.addPlayersToSquad = (playerList, result) => {
//   playerListData = playerList.map ( (data) => {
//     return [
//       data.tourid,
//       data.teamid,
//       data.playerid,
//       data.playing11
//   ];
//   });
//   sql.query("INSERT INTO teamsquad (tournamentid, teamid, playerid, playing11) VALUES ? WHERE   NOT EXISTS ( SELECT playerid FROM teamsquad WHERE teamid = ?); ", [playerListData,playerList[0]['teamid']], (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }
//       else {
//         result(null, []);
//         return;
//       }
//     });
// };
module.exports = EditTeam;