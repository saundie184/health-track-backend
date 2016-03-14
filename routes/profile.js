'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  res.send('Hello profile!');

});


// POST route for creating a new profile
// router.post('/:id')

//GET route for viewing a profile
// router.get(/:id)


module.exports = router;
