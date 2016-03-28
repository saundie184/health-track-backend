'use strict';
// require('dotenv').load();
//
// var environment = process.env.NODE_ENV || 'development';
// var config = require('../knexfile.js')[environment];
// module.exports = require('knex')(config);


var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js');
var knex = require('knex')(config[environment]);

module.exports = knex;

knex.migrate.latest([config]);
