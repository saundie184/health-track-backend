'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  res.send('Hello family page!');

});


// POST route for creating a new family
router.post('/:id', function(req, res){

});

//GET route for viewing a family
router.get('/:id', function(req, res) {
  var user_id = req.params.id;
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where({user_id: user_id})
    .then(function(data, err) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
});


module.exports = router;
