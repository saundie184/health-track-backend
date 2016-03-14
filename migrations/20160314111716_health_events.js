'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('health_events', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.text('type');
      table.text('name');
      table.text('description');
      table.timestamp('date');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('health_events')
  ]);
};
