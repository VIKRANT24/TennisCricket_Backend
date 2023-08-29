const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "http://document.criconn.tenniscricket.in/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, req.query.filename);
  },
});

let uploadFile = multer({
  storage: storage,
  dest: "http://document.criconn.tenniscricket.in/",
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;