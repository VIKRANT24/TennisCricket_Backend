const sql = require("./db.js");

// constructor
const SubAdmin = function() {
};

SubAdmin.addSubAdmin = (user_id, username, password, permissions, result) => {
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
        sql.query("INSERT INTO usermaster (user_id,username,password,userstate,cur_tourid,role,permissions) VALUES (?,?,?,?,?,?,?)", [user_id,username,password,'Active','-',3,permissions],(err, res) => {
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

  SubAdmin.editPermission = (user_id, permissions, result) => {
    sql.query("UPDATE usermaster SET ? WHERE user_id =?",[{permissions:permissions}, user_id], (err, res) => {
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
  
  SubAdmin.fetchSubAdmin = (result) => {
    sql.query("SELECT * FROM usermaster where role = '3'", (err, res) => {
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

  module.exports = SubAdmin;
  