const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};
global.__basedir = __dirname;
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({limit: "50mb", extended: true, parameterLimit: 500000}))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 500000}))
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/index.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//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