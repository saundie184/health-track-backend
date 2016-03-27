'use strict';
require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    debug: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    debug: true
  }

  // development: {
  //   client: 'pg',
  //   connection: {
  //     host: '127.0.0.1',
  //     database: 'health_track'
  //   },
  //   seeds: {
  //     directory: './seeds/dev'
  //   }
  // }
};
