'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('relations_health_events', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.integer('relation_id');
      table.text('name');
      table.text('type');
      table.text('description');
      table.text('date');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('relations_health_events')
  ]);
};
