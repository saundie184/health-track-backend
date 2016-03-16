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
      weight: req.body.weight
    }).then(function(data, err) {
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


module.exports = router;
