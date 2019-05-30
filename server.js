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

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/email", function(req, res) {
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
  smtpTrans.sendMail(mailOpts, function(error, response) {
    if (error) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
      console.log("success");
    }
  });
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
