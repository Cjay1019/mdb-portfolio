var express = require("express");
var app = express();
var path = require("path");
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
require("dotenv").config();

var PORT = process.env.PORT || 5055;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(allowCrossDomain);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/email", function(req, res) {
  console.log("test")
  var mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  mailOpts = {
    from: req.body.name + " &lt;" + req.body.email + "&gt;",
    to: "cjay741@gmail.com",
    subject: "New message from contact form at connerleigh.com",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.subject}: ${
      req.body.message
    }`
  };
  console.log(smtpTrans)
  console.log(mailOpts)
  smtpTrans.sendMail(mailOpts, function(error, response) {
    if (error) {
      console.log(error)
      res.sendStatus(500);
    } else {
      console.log(response)
      res.sendStatus(200);
      console.log("success");
    }
  });
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});