'use strict';

exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('height_weight', function(table) {
      table.increments('id').primary();
      table.decimal('height');
      table.decimal('weight');
      table.timestamp('date');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('height_weight')
  ]);
};
