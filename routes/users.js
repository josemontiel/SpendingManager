var express = require('express');
var router = express.Router();

var db = require('../models/db');
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!(req.session.user_id)) {
    handleError(res, "Unable to Authenticate", "You need to Sign in or Create a new Account", 403);
  } else {
    User.findOne({_id: req.session.user_id}, function(err, user) {
      if (err) {
        handleError(res, "User not Found", "The cookie probably expired", 403);
      } else {
        res.status(200).json(user);
      }
    })
  }
});

/*
  /api/user
  POST: Creates a new User
 */
router.post("/signup", function(req, res) {
  var body = req.body;

  console.log(body);

  if (!(body.first_name || body.last_name || body.password || body.email)) {
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
    return;
  }

  var passwordHash = require('password-hash');


  var newUser = new User();
  newUser.first_name = body.first_name;
  newUser.last_name = body.last_name;
  newUser.email = body.email;
  newUser.hash = passwordHash.generate(body.password);
  newUser.timestamp = new Date().getTime();
  newUser.type = body.type || 'user';

  User.find({email: body.email}, function(err, users) {
    if (err) {
      handleError(res, "User couldn't be saved", "Failed to create new User", 500);
    } else {
      if (users.length == 0) {
        newUser.save(function (err, user) {
          if (err) {
            handleError(res, "User couldn't be saved", "Failed to create new User", 500);
          } else {
            req.session.user_id = user._id;
            app.MongoStore.set(req.session.id, req.session);
            user.hash = "";
            res.status(201).json(user);
          }
        });
      } else {
        handleError(res, "Email Already in Use", "There's an User with that Email already", 500);
      }
    }
  });



});

/*
 /api/user/login
 POST: Logs in a user
 */
router.post("/login", function(req, res) {
  var body = req.body;

  console.log(body);

  if (!(body.password || body.email)) {
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
  }

  var passwordHash = require('password-hash');


  User.find({ email: body.email }, function(err, users) {
    if (err) {
      handleError(res, "An error ocurred", "Failed to Login", 500);
    } else {
      if (users.length != 0) {
        var user = users[0];
        if (passwordHash.verify(body.password, user.hash)) {
          console.log(req.session);
          req.session.user_id = user._id;
          req.session.save();
          users[0].hash = "";
          res.status(200).json(users[0]);
        } else {
          handleError(res, "Cannot Authenticate", "Check Email and Password combination.", 404);
        }
      } else {
        handleError(res, "User not found", "Email doesn't match our registry", 404);
      }

    }
  });

});

router.get("/logout", function(req, res) {
  var body = req.body;

  console.log(body);

  req.session.user_id = null;
  req.session.save();
  res.status(200).json();

});

function handleError(res, error, msg, status) {
  res.status(status).json({error: error, message: msg});
}

module.exports = router;
