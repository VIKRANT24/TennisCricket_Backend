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

Common.addCommentator = (coment_name, coment_mobile, coment_location, coment_image, result) => {
  var get = { coment_mobile: coment_mobile };
  sql.query('SELECT * FROM CRICONN_COMMENTATOR WHERE ? ', get, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result({ kind: "Commentator already exist" }, null);
      return;
    }
    else {
      sql.query("INSERT INTO CRICONN_COMMENTATOR (coment_name,coment_mobile,coment_location,coment_image) VALUES (?,?,?,?)", [coment_name, coment_mobile, coment_location, coment_image], (err1, res1) => {
        if (err1) {
          console.log("error: ", err1);
          result(err1, null);
          return;
        }
        else {
          var unqid = "CRICONNCOM" + res1.insertId
          sql.query("UPDATE CRICONN_COMMENTATOR SET coment_unqid=? WHERE coment_mobile=?", [unqid, coment_mobile], (err2, res2) => {
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
        }
      });
    }
  });
};

Common.fetchCommentator = (result) => {
  sql.query("SELECT * FROM CRICONN_COMMENTATOR ORDER BY coment_name DESC", (err, res) => {
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

Common.addUmpires = (umpire_name, umpire_mobile, umpire_location, umpire_image, result) => {
  var get = { umpire_mobile: umpire_mobile };
  sql.query('SELECT * FROM CRICONN_UMPIRE WHERE ? ', get, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result({ kind: "Umpire already exist" }, null);
      return;
    }
    else {
      sql.query("INSERT INTO CRICONN_UMPIRE (umpire_name,umpire_mobile,umpire_location,umpire_image) VALUES (?,?,?,?)", [umpire_name, umpire_mobile, umpire_location, umpire_image], (err1, res1) => {
        if (err1) {
          console.log("error: ", err1);
          result(err1, null);
          return;
        }
        else {
          var unqid = "CRICONNUMP" + res1.insertId
          sql.query("UPDATE CRICONN_UMPIRE SET umpire_unqid=? WHERE umpire_mobile=?", [unqid, umpire_mobile], (err2, res2) => {
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
        }
      });
    }
  });
};

Common.fetchUmpires = (result) => {
  sql.query("SELECT * FROM CRICONN_UMPIRE ORDER BY umpire_name DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      trytest();
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

async function trytest(){
  setTimeout(function(){
    console.log("sdgsdghdghfjfjhffd")
  }, 10000);
}
module.exports = Common;
