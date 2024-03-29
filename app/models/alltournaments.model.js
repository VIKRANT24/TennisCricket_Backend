const sql = require("./db.js");

// constructor
const AllTournaments = function () {
};

AllTournaments.findUserByID = (id, result) => {
  var get = { user_id: id };
  sql.query('SELECT * FROM usermaster WHERE ? ', get, (err, res) => {
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
AllTournaments.getUserTournamentID = (id, result) => {
  var get = { userid: id };
  sql.query('SELECT * FROM usertournament WHERE ? ', get, (err, res) => {
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
AllTournaments.getUserTournament = (tour_id, result) => {
  var get = { Tournamentid: tour_id };
  sql.query('SELECT * FROM tournaments WHERE ? ', get, (err, res) => {
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
AllTournaments.getUserMainTournament = (mainTournamentid, result) => {
  var get = { mainTournamentid: mainTournamentid };
  sql.query('SELECT * FROM maintournaments WHERE ? ', get, (err, res) => {
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
AllTournaments.getAllTournaments = (result) => {
  sql.query('SELECT T.*,MT.TournamentName FROM `tournaments` as T inner join maintournaments as MT on T.`mainTournamentid`=MT.mainTournamentid order by Tournamentid DESC', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      var get = { role: 2 };
      sql.query('SELECT * FROM usermaster WHERE ? ', get, (err1, userList) => {
        if (err1) {
          console.log("error: ", err);
          result(err1, null);
          return;
        }
        if (userList.length) {
          let tournamentList = [];
          let userarr = [];
          res.forEach(item => {
            userList.forEach(item1 =>{
              if(item.Tournamentid.toString() === item1.cur_tourid){
                userarr.push(item1)
              }
            })
            tournamentList.push({ ...item, ...{"users":userarr} });
            userarr =[]
          });
          result(null, tournamentList, userList);
          return;
        }
        result({ kind: "not_found" }, null);
      });
    }
    else{
    result({ kind: "not_found" }, null);
    }
  });
};

AllTournaments.getAllUser = (result) => {
  // sql.query('SELECT T.*, (SELECT TournamentName FROM maintournaments WHERE mainTournamentid = TM.`mainTournamentid`) as TournamentName FROM usermaster as T inner join tournaments as TM on T.cur_tourid = TM.Tournamentid WHERE T.role = ? ORDER BY id DESC ', [2], (err, res) => {
    sql.query("SELECT * FROM usermaster where user_id !='WQ61fPTlDdao7FMlHdtxqioSRpE3' and role != '3' and userstate != 'Deactive' ORDER BY id DESC", (err, res) => {  
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
AllTournaments.linkUserWithTournament = (user_id, tourid, result) => {
  sql.query("UPDATE usermaster SET ? WHERE user_id =?", [{ cur_tourid: tourid }, user_id], (err, res) => {
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
};
AllTournaments.fetchMyTournament = (user_id, result) => {
  var get = { userid: user_id };
  sql.query('SELECT * FROM usertournament WHERE ? ', get, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else if (res.length) {
      var get = { Tournamentid: res[0].tour_id };
      sql.query('SELECT * FROM tournaments WHERE ? ', get, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        else if (res.length) {
          var get = { mainTournamentid: res[0].mainTournamentid };
          sql.query('SELECT * FROM maintournaments WHERE ? ', get, (err, res) => {
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
        }
        else {
          result({ kind: "not_found" }, null);
        }
      });
    }
    else {
      result({ kind: "not_found" }, null);
    }
  });
};

AllTournaments.addTournament = (tournamentType, tournament, organiser, tourType, place, ground, squadlimit, season, ballType, bowlingType, noOfGroups, startDate, endDate, year, tourUnqId, subAdName, subAdId, result) => {
  sql.query("INSERT INTO maintournaments (TournamentName) VALUES (?)", [tournament], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      var get = { TournamentName: tournament };
      sql.query('SELECT * FROM maintournaments WHERE ? ', get, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        else if (res.length) {
          var mainTournamentid = res[0].mainTournamentid;
          var tournamentState = "ongoing";
          var decOne = "Yes";
          var uniqueTournamentId = mainTournamentid+tourUnqId;
          sql.query("INSERT INTO  tournaments (Season,Year,organisername,Type,Place,Ground,TournamentState,tournament_type,Ball_type,Bowling_type,Squad_limit,declare_one,No_of_Groups,mainTournamentid,startdate,enddate,tourUnqId,subAdName,subAdId) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [season, year, organiser, tournamentType, place, ground, tournamentState, tourType, ballType, bowlingType, squadlimit, decOne, noOfGroups, mainTournamentid, startDate, endDate, uniqueTournamentId, subAdName, subAdId], (err, res) => {
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
  });
};
AllTournaments.searchTournament = (tournamentName, tournamentId, result) => {
  if(tournamentName!= null && tournamentName!= undefined){
  var get = { userid: user_id };
  sql.query('SELECT * FROM usertournament WHERE ? ', get, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else if (res.length) {
      var get = { Tournamentid: res[0].tour_id };
      sql.query('SELECT * FROM tournaments WHERE ? ', get, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        else if (res.length) {
          var get = { mainTournamentid: res[0].mainTournamentid };
          sql.query('SELECT * FROM maintournaments WHERE ? ', get, (err, res) => {
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
        }
        else {
          result({ kind: "not_found" }, null);
        }
      });
    }
    else {
      result({ kind: "not_found" }, null);
    }
  });
}
else if(tournamentId!= null && tournamentId!= undefined){
  sql.query('SELECT * FROM tournaments WHERE tourUnqId=? ',[tournamentId], (err, res) => {
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
}
else{
  result("Please Try again some time", null);
}
};

module.exports = AllTournaments;
