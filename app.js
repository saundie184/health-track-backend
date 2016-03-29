'use strict';

require('dotenv').load();
var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jsonWebToken = require('jsonwebtoken');

var cors = require('cors');


//Routes
var routes = require('./routes/index');
var profile = require('./routes/profile');
var family = require('./routes/family');

var app = express();
//Enable cors before routes
var corsOptions = {
  // origin: 'https://health-track-api.firebaseapp.com'
  // origin: 'https://healthtrack.online'
  origin: '*'
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



//TODO use .env for this
var secret = 'mySecret';
var config = {
  secret: secret
};

app.use('/', routes);
app.use('/profile', jwt(config), profile);
app.use('/family', jwt(config), family);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
