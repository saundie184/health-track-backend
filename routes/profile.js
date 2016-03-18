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
  var user_id = req.params.id;
  knex('health_events').select('*').where({
    user_id: user_id
  }).then(function(data, err) {
    if (!checkError(res, err)) {
      res.json(data);
    }
  });

});
//GET route for viewing a health_categories
router.get('/:id/categories', function(req, res) {
  var user_id = req.params.id;
  knex('health_categories').select('*').where({
    user_id: user_id
  }).then(function(data, err) {
    if (!checkError(res, err)) {
      res.json(data);
    }
  });

});


module.exports = router;
