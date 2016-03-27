'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jsonWebToken = require('jsonwebtoken');

//TODO use .env for this
var secret = 'mySecret';

router.get('/', function(req, res){
  res.send('Health Track backend');
});
// ----- Users -----

router.post('/signup', function(req, res) {
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
    if(data){
      if (data.length === 0) {
        res.send("Failure");
      } else {
        // console.log(data);
        bcrypt.compare(user.password, data.password, function(err, match) {
          if (match) {
            var user = data;
              delete user.password;
              var expires = {
                expiresIn : '10h'
              };
            var token = jsonWebToken.sign(user, secret, expires);
            res.json({token: token, email: user.email, id: user.id});
            console.log('Success!');
          } else {
            res.send('error');
            console.log('Email and password do not match');
          }
        });
      }
    } else {
      res.send('error');
    }

  });
});


module.exports = router;
