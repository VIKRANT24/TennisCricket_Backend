const sql = require("./db.js");

// constructor
const User = function() {
};

User.addUser = (user_id, username, password, addedBy, full_name, mobile_no, filename, result) => {
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
        var permissions = 'mytournaments,resetpassword,viewmatches,editmatch,editteam,managevideo,creatematch,viewscorecard';
        sql.query("INSERT INTO usermaster (user_id,username,password,userstate,cur_tourid,role,permissions,add_user_by,mobile_no,full_name,filename) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [user_id,username,password,'Active','-',2,permissions,addedBy,mobile_no,full_name,filename],(err, res) => {
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

    User.resetPassword = (user_id, password, result) => {
      sql.query("UPDATE usermaster SET ? WHERE user_id =?",[{password:password}, user_id], (err, res) => {
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
      };
  module.exports = User;
  