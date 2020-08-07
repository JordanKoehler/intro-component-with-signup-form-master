const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/trialSignUpDB';
mongoose.connect("mongodb://localhost/trialSignUpDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Database Name
const dbName = 'trialSignUpDB';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  client.close();
});

const signUpSchema = {
  fName: String,
  lName: String,
  email: String,
  password: String
};

const SignUp = mongoose.model("SignUp", signUpSchema);

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/success", function(req,res){
  res.sendFile(__dirname + "/success.html");
});

app.post("/success", function(req, res) {
  const signUpForm = new SignUp({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password
  });

  signUpForm.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database saved");
      res.redirect("/success");
    }
  });
});


app.listen(3000, function() {
  console.log("Server is running on 3000");
});
