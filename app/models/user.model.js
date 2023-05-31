const sql = require("./db.js");

// constructor
const User = function() {
};

User.addUser = (user_id, username, password, result) => {
    var get = {user_id: user_id};
    sql.query('SELECT * FROM usermaster WHERE ? ', get, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result({ kind: "User already exist" }, null);
        return;
      }
      else{
        sql.query("INSERT INTO usermaster (user_id,username,password,userstate,cur_tourid) VALUES (?,?,?,?,?)", [user_id,username,password,'Active','-'],(err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              if (res.length) {
                result(null, res[0]);
                return;
              }
              result({ kind: "not_found" }, null);
          });
      }
    });
  };

  User.fetchRegisterUser = (result) => {
    sql.query("SELECT * FROM usermaster where user_id !='WQ61fPTlDdao7FMlHdtxqioSRpE3' and role != '3' and userstate != 'Deactive'", (err, res) => {
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
  module.exports = User;