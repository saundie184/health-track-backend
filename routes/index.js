'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

router.get('/', function(req, res) {
  res.send('Hello index!');

});

// ----- Users -----

router.post('/signup', function(req, res) {
  // var testUser = {
  //   firstname: 'joe',
  //   lastname: 'jones',
  //   email: 'joe@email.com',
  //   password: 'password6'
  // };
  var user = req.body;
  console.log(user);
  knex('users').insert(user).returning('id').then(function(data, err){
    console.log(data);
    res.send('Success');
  });
});

// function hashPassword(){
//
// }


router.post('/signin', function(req, res) {
  res.send('This is the sign-in page');
});

module.exports = router;
