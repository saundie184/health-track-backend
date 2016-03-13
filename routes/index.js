'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

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
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      knex('users').insert({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: hash
      }).returning('id').then(function(data, err) {
        // console.log(data);
        if (data) {
          res.send('Success');
        } else {
          res.send("Error" + err);
        }
      });
    });
  });
});



router.post('/signin', function(req, res) {
  var user = req.body;
  knex('users').first().where({
    email: user.email
  }).then(function(data, err) {
    if (data.length === 0) {
      res.send("Failure");
    } else {
      console.log(data);
      bcrypt.compare(user.password, data.password, function(err, match) {
        if (match) {
          console.log('success!!');
        } else {
          console.log('Email and password do not match');
        }
      });
    }
  });
});

router.post('/signout', function(req, res){
  //delete jwts?
})

module.exports = router;
