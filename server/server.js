/* eslint-disable no-console */
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var multer = require("multer");
var upload = multer({dest: "static/upload/"});
require("dotenv").config();

//Source using models and mongoose: https://www.youtube.com/watch?v=cVYQEvP-_PA
var User = require("../models/user.js");



mongoose.connect("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME, {useNewUrlParser: true});

var db = mongoose.connection;

//Source connection check: https://www.youtube.com/watch?v=cVYQEvP-_PA
//Check connection
db.once("open", function(){
  
  console.log("Connected to MongoDb");

});


// Check connection for db errors
db.on("error", function(err){
  
  console.log(err);

});

var app = express();

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", "view/pages");
app.set("view engine", "ejs");
app.get("/", home);
app.get("/login", login);
app.get("/changeprofile", changeProfile);

//route for cancelling the input of the form
app.post("/cancel", cancelInput);

//route for removing artist
app.post("/remove", removeArtist);


app.post("/", upload.single("profilePic"), changeInfo);
app.use(notFound);

function home(req, res) {

  //Source findOne: https://stackoverflow.com/questions/7033331/how-to-use-mongoose-findone
  User.findOne({}, function(err, users) {

    if(err){
      console.log(err);
    }

    else{
    
      res.render("index", { 
        pageTitle: users.name + "'s Profile", 
        users: users 
      });
    }
  });
}

function login(req, res) {
 
  res.render("login", {
    pageTitle: "Login"
  });
}

function changeProfile(req, res) {

  User.findOne({}, function(err, users){
    if(err){
      console.log(err);
    }

    else{
      res.render("changeprofile", {
        pageTitle: "Change profile",
        users: users
      });
    } 
  });
}

function changeInfo(req, res) {

  //ads a artist to the artists array
  User.findOneAndUpdate(
    {id: req.params.id},
    {$push: {artists: req.body.artists}}, 
    {safe: true}, function(err){

    console.log(err);

    },
  );

  //finds and updates the user bio
  User.findOneAndUpdate(
    {id: req.params.id},
    {bio: req.body.bio}, 
    {safe: true}, function(err){

    console.log(err);

    },
  );

  res.redirect("/");

}

// Callback which generates 404 page 
function notFound(req, res) {

  res.status(404).render("notfound", {
    pageTitle: "404"
  });
}

function cancelInput(req, res){
  res.redirect("/");
}

function removeArtist(req, res){

  User.findOneAndUpdate(
    {id: req.params.id},
    {$pull: {artists: req.body.removeartist}},
    {safe: true}, function(err){

      if(err){
      console.log(err);
      }

      else{
      res.redirect("/changeProfile");
      }
    }
  );
}

// Listen to port 5000
app.listen(5000, function() {
 
  console.log("Dev app listening on port 5000!");

});