const sql = require("./db.js");

// constructor
const Common = function () {
};

Common.addGround = (ground_name, ground_latlong, ground_id, result) => {
  var get = { ground_id: ground_id };
  sql.query('SELECT * FROM CRICONN_GROUNDS WHERE ? ', get, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result({ kind: "Ground already Available" }, null);
      return;
    }
    else {
      sql.query("INSERT INTO CRICONN_GROUNDS (ground_name, lat_long, ground_id) VALUES (?,?,?)", [ground_name, ground_latlong, ground_id], (err, res) => {
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

Common.fetchGround = (result) => {
  sql.query("SELECT * FROM CRICONN_GROUNDS ORDER BY ground_name DESC", (err, res) => {
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

module.exports = Common;
