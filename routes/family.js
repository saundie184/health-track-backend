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
// router.post('/:id')

//GET route for viewing a family
// router.get(/:id)


module.exports = router;
