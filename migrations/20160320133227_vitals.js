'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('relations', function(table){
      table.date('dob');
      table.date('dod');
      table.text('sex');
      table.text('blood_type');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.dropTable('relations')
  ]);
};
