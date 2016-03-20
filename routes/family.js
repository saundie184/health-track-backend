'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

//Error handling
function checkError(res, err) {
  var fail = false;
  if (err) {
    fail = true;
    res.send(err);
  }
  return fail;
}
//
// router.get('/', function(req, res) {
//   res.send('Hello family page!');
//
// });


// POST route for creating a new family
router.post('/:id', function(req, res) {
  var user_id = req.params.id;
  knex('relations').insert({
    user_id: user_id,
    name: req.body.name,
    relationship: req.body.relationship
  }).then(function(data, err) {
    if (!checkError(res, err)) {
      res.send('Success!');
    }
  });
});

//GET route for viewing a immediate family
router.get('/:id', function(req, res) {
  var user_id = req.params.id;
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where({
      user_id: user_id
    })
    .andWhere('relationship', 'mother')
    .orWhere('relationship', 'father')
    .orWhere('relationship', 'sister')
    .orWhere('relationship', 'brother')
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });
});

//GET route for viewing a immediate family


// GET route for viewing a mother's side
router.get('/:id/mothers', function(req, res) {
  var user_id = req.params.id;
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where('user_id', user_id).andWhere('relationship', 'like', 'mothers%')
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });
});

// GET route for viewing a father's side
router.get('/:id/fathers', function(req, res) {
  var user_id = req.params.id;
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where('user_id', user_id).andWhere('relationship', 'like', 'fathers%')
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });
});


module.exports = router;
