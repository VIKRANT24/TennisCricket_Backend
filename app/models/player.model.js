const sql = require("./db.js");

// constructor
const Player = function () {
};

Player.addEditPlayer = (playername, imgdata, playerrole, playermobile, email, batting, bowling, dob, playerid, tag, country, state, city, result) => {
  var get = { playermobile: playermobile };
  if (tag == "add") {
    sql.query('SELECT * FROM players WHERE ? ', get, (err, res) => {
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
        sql.query("INSERT INTO players (playername,imgdata,playerrole,playermobile,email,batting,bowling,dob,imgpath,city,state,country) VALUES (?,?,?,?,?,?,?,?,?)", [playername, "", playerrole, playermobile, email, batting, bowling, dob, "", city, state, country], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          else {
            result(null, res.insertId);
            return;
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