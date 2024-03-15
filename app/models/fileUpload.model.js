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

// var ImageKit = require("imagekit");
// var fs = require('fs');

// var imagekit = new ImageKit({
//     publicKey : "public_D147u1wiAjbM3S/BmDF6YAYO1iQ=",
//     privateKey : "private_BGlTShXYtWd5yMGaR5pzkWPT1Dc=",
//     urlEndpoint : "https://ik.imagekit.io/cricimgupload"
// });

// var base64Img = "iVBORw0KGgoAAAAN";

// imagekit.upload({
//     file : base64Img, //required
//     fileName : "my_file_name.jpg",   //required
//     tags: ["tag1","tag2"]
// }, function(error, result) {
//     if(error) console.log(error);
//     else console.log(result);
// });