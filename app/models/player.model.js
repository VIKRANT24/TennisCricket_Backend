const sql = require("./db.js");

// constructor
const Player = function() {
};

Player.addEditPlayer = (playername, imgdata, playerrole, playermobile, email, batting, bowling, dob, tag, result) => {
  var get = {playermobile: playermobile};
  sql.query('SELECT * FROM players WHERE ? ', get, (err, res) => {
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
    if(tag =="add"){  
    sql.query("INSERT INTO players (playername,imgdata,playerrole,playermobile,email,batting,bowling,dob,imgpath) VALUES (?,?,?,?,?,?,?,?,?)", [playername,imgdata,playerrole,playermobile,email,batting,bowling,dob,""],(err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      else{
        result(null, []);
        return;
      }
    });
  }
  else{
    sql.query("INSERT INTO players (playername,imgdata,playerrole,playermobile,email,batting,bowling,dob,imgpath) VALUES (?,?,?,?,?,?,?,?,?)", [playername,imgdata,playerrole,playermobile,email,batting,bowling,dob,""],(err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      else{
        result(null, []);
        return;
      }
    });
  }
  }
});
};

  Player.fetchPlayerList = (result) => {
    sql.query("SELECT * FROM players", (err, res) => {
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
  module.exports = Player;