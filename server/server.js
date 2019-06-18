/* eslint-disable no-console */
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var multer = require("multer");
var upload = multer({dest: "static/upload/"});
var expressSession = require("express-session");
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

app.post("/", upload.single("profilePic"), changeInfo);
app.use(notFound);
app.use(expressSession({secret:process.env.SESSION_SECRECT,saveUninitialized:true,resave:false, cookie: {maxAge: 900000},expires: new Date(Date.now() + 900000) }));

//renders the user's profile page
function home(req, res) {

  //Source findOne: https://stackoverflow.com/questions/7033331/how-to-use-mongoose-findone
  User.findById({_id: process.env.SESSION_SECRET}, function(err, users) {

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

//renders the login page
function login(req, res) {
  res.render("login", {
    pageTitle: "Login"
  });
}

//renders the changeProfile page
function changeProfile(req, res) {

  //finds the current user of the app, and sends data 
  User.findById({_id: process.env.SESSION_SECRET}, function(err, users){
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

  //Adds the filename to the profile image of user  
var uploadImage;

  if(req.file == undefined){
    uploadImage = "placeholder.png";
  }
  else{
    uploadImage = req.file.filename;
  }

  User.findByIdAndUpdate(
    {_id: process.env.SESSION_SECRET},
    {img: uploadImage, $push: {artists: req.body.artists}, bio: req.body.bio},
    {upsert: true}, function(err){
      if(err){
        console.log(err);
      }
    });
  //redirects to user profile when user submits
  res.redirect("/");
}

// function which generates 404 page 
function notFound(req, res) {
  res.status(404).render("notfound", {
    pageTitle: "404"
  });
}

//function which cancel the change info form
function cancelInput(req, res){
  res.redirect("/");
}

// Listen to port 5000
app.listen(5000, function() {
  console.log("Dev app listening on port 5000!");
});