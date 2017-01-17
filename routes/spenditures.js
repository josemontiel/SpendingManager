var express = require('express');
var router = express.Router();

var db = require('../models/db');
var User = require('../models/User');
var Spenditure = require('../models/Spenditure');

/* /api/spenditure
 * GET: Fetches a user's spenditure
 * POST: Adds a new spenditure */
router.get('/', function(req, res, next) {

  if (!req.session.user_id) {
    handleError(res, "Unable to Authenticate", "Session could not be found", 403);
    return;
  }

  var start = req.query.start || -1;
  var end = req.query.end;

  User.find({_id: req.session.user_id}, function(err, users) {
    if (err) {

    } else {
      var user = users[0];
      var criteria;
      if (user.type == 'user') {
        criteria = {user_id: req.session.user_id, when: {$gte: start, $lte: end}};
      } else {
        criteria = {when: {$gte: start, $lte: end}}
      }

      Spenditure.find(criteria).sort({when: -1}).exec(function(err, spenditures) {
        if (err) {
          console.log(err);
          handleError(res, "Couldn't fetch spenditures", "Try again later", 500);
        } else {
          console.log(spenditures);
          res.status(200).json(spenditures);
        }

      })
    }
  });
});

router.post('/', function(req, res, next) {
  if (!req.session.user_id) {
    handleError(res, "Unable to Authenticate", "Session could not be found", 403);
    return;
  }

  var body = req.body;

  if (!(body.description || body.amount || body.when)) {
    handleError(res, "Missing Info", "Must provide a description and amount", 400);
    return;
  }

  var spend = new Spenditure();
  spend.user_id = req.session.user_id;
  spend.description = body.description;
  spend.amount = body.amount;
  spend.when = body.when;
  spend.createdAt = new Date().getTime();

  spend.save(function (err, spenditure) {
    if (err) {
      handleError(res, "Spenditure couldn't be saved", "Failed to create new Spenditure", 500);
    } else {
      res.status(201).json(spenditure);
    }
  });
});

router.post('/:id', function(req, res, next) {
  if (!req.session.user_id) {
    handleError(res, "Unable to Authenticate", "Session could not be found", 403);
    return;
  }

  var id = req.params.id;
  var body = req.body;

  if (!(body.description || body.amount || body.when || id)) {
    handleError(res, "Missing Info", "Must provide a description and amount", 400);
    return;
  }

  Spenditure.find({_id: id}, function(err, spends) {
    if (err) {
      handleError(res, "Unable to Update", "Spenditure could not be found", 404);
      return;
    } else {
      var spend = spends[0];
      spend.description = body.description;
      spend.amount = body.amount;
      spend.when = body.when;
      spend.timestamp = new Date().getTime();

      spend.save( function (e, updated) {
        if (e) {
          handleError(res, "Unable to Update", "Spenditure could not be found", 404);
        } else {
          res.status(200).json(updated);
        }
      });
    }
  });

});

/* /api/spenditure/:id
 * DELETE: Deletes a spenditure with given _id */
router.delete('/:id', function(req, res, next) {
  if (!req.session.user_id) {
    handleError(res, "Unable to Authenticate", "Session could not be found", 403);
    return;
  }

  var spenditureId = req.params.id;

  Spenditure.find({_id: spenditureId}).exec(function(err, spenditures) {
    if (err) {
      handleError(res, "Cannot delete Spenditure", "Cannot delete Spenditure", 500);
    } else {
      spenditures.forEach(function (spend) {
        if (spend.user_id == req.session.user_id) {
          spend.remove();
        } else {
          handleError(res, "Forbidden Deletion", "Cannot delete, you don't own this entry", 500);
        }
      });

      res.status(200).json();
    }
  });
});



function handleError(res, error, msg, status) {
  res.status(status).json({error: error, message: msg});
}

module.exports = router;
