'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.text('firstname');
      table.text('lastname');
      table.text('email');
      table.text('password');
      table.date('dob');
      table.text('sex');
      table.text('blood_type');
    })
    .knex.schema.createTable('relations', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.text('name');
      table.text('relationship');
    })
    .knex.schema.createTable('height_weight', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.decimal('height');
      table.decimal('weight');
      table.date('date');
    })
    .knex.schema.createTable('health_categories', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.text('type');
      table.text('name');
      table.text('description');
      table.date('date');
    })
    .knex.schema.createTable('health_events', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.text('type');
      table.text('name');
      table.text('description');
      table.date('date');
    })
  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.dropTable('users'),
    knex.dropTable('relations'),
    knex.dropTable('height_weight'),
    knex.dropTable('health_categories'),
    knex.dropTable('health_events')
  ]);
};
