/* eslint-disable no-console */
var port = process.env.PORT || 5000;
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multer = require("multer");
var upload = multer({ dest: __dirname + "/static/upload/" });
var session = require("express-session");
var path = require("path");
require("dotenv").config();


//Source using models and mongoose: https://www.youtube.com/watch?v=cVYQEvP-_PA
var User = require("../models/user.js");

mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.DB_SERVER +
    "/" +
    process.env.DB_NAME +
    "?retry?Writes=true",
  { useNewUrlParser: true }
);

var db = mongoose.connection;

//Source connection check: https://www.youtube.com/watch?v=cVYQEvP-_PA
//Check connection
db.once("open", function() {
  console.log("Connected to MongoDb");
});

// Check connection for db errors
db.on("error", function(err) {
  console.log(err);
});

var app = express();
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + "/view/pages");
app.set("view engine", "ejs");
app.get("/", login);
app.get("/profile/delete/:id", removeUser);

// initializing session
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {},
  })
);

app.get("/changeprofile", changeProfile);
app.get("/profile", profile);
//route for cancelling the input of the form
app.post("/cancel", cancelInput);

app.post("/change", upload.single("profilePic"), changeInfo);
app.post("/logging", loggingIn);
app.use(notFound);

//renders the login page
function login(req, res) {
  res.render("login.ejs", {
    pageTitle: "Login"
  });
}

function loggingIn(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username, password: password }, function(
    err,
    users
  ) {
    if (err) {
      console.log(err);
    }

    req.session.users = users;

    if (!users) {
      res.redirect(notFound);
    }
    console.log("Session is:", users);
    res.redirect("/profile");
  });
}

//renders the changeProfile page
function changeProfile(req, res) {
  console.log("Session is: >>>>", req.session.users.img);

  // finds the current user of the app, and sends data
  User.findById(req.session.users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.render("changeprofile.ejs", {
        pageTitle: "Change profile",
        users: users
      });
    }
  });
}

function profile(req, res) {
  //finds the current logged in user, and renders content in profile template
  User.findById(req.session.users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.render("index.ejs", {
        users: users,
        pageTitle: users.name + "'s Profile"
      });
    }
  });
}

function changeInfo(req, res) {
  //Adds the filename to the profile image of user
  var uploadImage;

  console.log("This is the file requs", req.file);

  // if user doesn't upload image, image isn't overwritten
  if (req.file == undefined) {
    uploadImage = req.session.users.img;
  } else {
    uploadImage = req.file.filename;
  }

  //updates user bio, artists, and image on submit
  User.findByIdAndUpdate(
    req.session.users,
    {
      img: uploadImage,
      $push: { artists: req.body.artists },
      bio: req.body.bio
    },
    { upsert: true },
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
  //redirects to user profile when user submits
  res.redirect("/profile");
}

// function which generates 404 page
function notFound(req, res) {
  res.status(404).render("notfound", {
    pageTitle: "404"
  });
}

//function which cancel the change info form
function cancelInput(req, res) {
  res.redirect("/profile");
}

function removeUser(req, res) {
  //deletes the current user's profile from db
  User.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.log("Something went wrong", err);
    }
    res.redirect("/");
  });
}

// Listen to port 5000
app.listen(port, function() {
  console.log("Dev app listening on port: " + port);
});
