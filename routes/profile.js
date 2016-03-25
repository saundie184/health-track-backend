'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bodyParser = require('body-parser');
// var bcrypt = require('bcrypt');

//Error handling
function checkError(res, err) {
  var fail = false;
  if (err) {
    fail = true;
    res.send(err);
  }
  return fail;
}

// router.get('/', function(req, res) {
//   res.send('Hello profile!');
//
// });


// POST route for creating a new profile
router.post('/:id', function(req, res) {

  // var id = req.params.id;
  // console.log(req.body);
  knex('users').where({
    id: req.params.id
  }).update({
    dob: req.body.dob,
    sex: req.body.sex,
    blood_type: req.body.blood_type
  }).then(function(data, err) {
    if (!checkError(res, err)) {
      res.send('Success');
    }
  });
});

// POST route for creating height_weight
router.post('/:id/hw', function(req, res) {
  // console.log(req.body);
  knex('height_weight')
    .insert({
      user_id: req.params.id,
      height: req.body.height,
      weight: req.body.weight,
      date: req.body.date
    }).then(function(data, err) {
      if (!checkError(res, err)) {
        res.send('Success');
      }
    });
});

// POST route for creating health_events
router.post('/:id/events', function(req, res) {
  // console.log(req.body);
  var eventsArray = req.body;
  knex('health_events')
    .insert(eventsArray).then(function(data, err) {
      if (!checkError(res, err)) {
        res.send('Success');
      }
    });
});

// POST route for creating health_categories
router.post('/:id/categories', function(req, res) {
  // console.log(req.body);
  var categoriesArray = req.body;
  knex('health_categories')
    .insert(categoriesArray).then(function(data, err) {
      if (!checkError(res, err)) {
        res.send('Success');
      }
    });
});



//GET route for viewing a profile
router.get('/:id', function(req, res) {
  var id = req.params.id;
  knex('users').select('*').where({
    id: id
  }).then(function(data, err) {
    if (!checkError(res, err)) {
      res.json(data);
    }
  });

});

//GET route for viewing a height_weight
router.get('/:id/hw', function(req, res) {
  var user_id = req.params.id;
  knex('height_weight').select('*').where({
    user_id: user_id
  }).then(function(data, err) {
    if (!checkError(res, err)) {
      res.json(data);
    }
  });

});

//GET route for viewing a health_events
router.get('/:id/events', function(req, res) {
  var start;
  var end;
  console.log(req.body);
  if (typeof req.query.start !== 'undefined' && typeof req.query.end !== 'undefined') {
    start = parseInt(req.query.start);
    end = parseInt(req.query.end);
  } else {
    start = 1800;
    end = new Date().getFullYear();
  }
  var user_id = req.params.id;
  knex('health_events').select('*').where({
    user_id: user_id
  }).then(function(data, err) {
    // console.log(data);
    var obj = [];
    if (!checkError(res, err)) {
      for (var i = 0; i < data.length; i++) {
        var year = data[i].date.getFullYear();
        if (year >= start && year <= end) {
          // console.log(data[i]);
          obj.push(data[i]);
        }
      }
      // console.log(obj);
      res.json(obj);
    }
  });

});
//GET route for viewing a health_categories
router.get('/:id/categories', function(req, res) {
  var start;
  var end;
  if (typeof req.query.start !== 'undefined' && typeof req.query.end !== 'undefined') {
    start = parseInt(req.query.start);
    end = parseInt(req.query.end);
  } else {
    start = 1800;
    end = new Date().getFullYear();
  }
  var user_id = req.params.id;
  knex('health_categories').select('*').where({
    user_id: user_id
  }).then(function(data, err) {
    var obj = [];
    if (!checkError(res, err)) {
      for (var i = 0; i < data.length; i++) {
        var year = data[i].date.getFullYear();
        if (year >= start && year <= end) {
          obj.push(data[i]);
        }
      }
      res.json(obj);
    }
  });

});


module.exports = router;
