'use strict';

// require('dotenv').load();
var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var jwt = require('express-jwt');
// var jsonWebToken = require('jsonwebtoken');

// var cors = require('cors');

//Routes
var routes = require('./routes/index');
// var dreams = require('./routes/dreams');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
