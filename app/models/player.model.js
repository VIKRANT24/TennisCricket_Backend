const sql = require("./db.js");

// constructor
const Player = function () {
};


Player.addEditPlayer = (player_name,	player_mobile,	player_logo,	player_place, player_email, player_dob, tag, result) => {
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
        sql.query("INSERT INTO CRICONN_PLAYERS (player_name,	player_mobile,	player_logo,	player_place, player_email, player_dob) VALUES (?,?,?,?,?,?)", [player_name,	player_mobile,	player_logo,	player_place, player_email, player_dob], (err1, res1) => {
          if (err1) {
            console.log("error: ", err1);
            result(err1, null);
            return;
          }
          else {   
            if(res1.insertId!=null && res1.insertId!=undefined && res1.insertId!=0){
            var playerID = res1.insertId 
            var playerUnqID = player_name+res1.insertId
            sql.query("UPDATE CRICONN_PLAYERS SET ? WHERE player_id =?", [{ player_unqid: playerUnqID }, playerID], (err2, res2) => {
              if (err2) {
                console.log("error: ", err2);
                result(err2, null);
                return;
              }
              else {
                result(null, []);
                return;
              }
            });
          }else{
            result("please try after sometime", null);
            return;
          }
          }
        });
      }
    });
  }
  else {
    sql.query('SELECT * FROM players WHERE playermobile = ? AND playerid <> ?',[playermobile,playerid], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result({ kind: "Mobile number already exist"}, null);
        return;
      }
      else{
        sql.query("UPDATE players SET ? WHERE playerid =?", [{ playername: playername, imgdata: "", playerrole: playerrole, playermobile: playermobile, email: email, batting: batting, bowling: bowling, dob: dob, city: city, state: state, country:country}, playerid], (err, res) => {
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
  if(playername == "" || playername == undefined || playername == null){
    sql.query("SELECT * FROM players ORDER BY playerid DESC", (err, res) => {
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
  else{
    sql.query("SELECT * FROM players WHERE playername =? ORDER BY playerid DESC", [playername], (err, res) => {
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
module.exports = Player;