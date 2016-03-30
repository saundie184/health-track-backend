'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('relations', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.text('name');
      table.text('relationship');
    })
  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('relations')
  ]);
};
