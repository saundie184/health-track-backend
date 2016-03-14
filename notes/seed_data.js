'use strict';

exports.seed = function(knex, Promise) {
  return Promise.join(
      knex('users').del(),
      knex('height_weight').del(),
      knex('health_events').del(),
      knex('health_categories').del(),
      knex('relations').del()
    )
    .then(function() {
      return Promise.join(
        knex('users').insert({
          firstname: 'Demo',
          lastname: 'Tester',
          email: 'demo@demo.com',
          password: 'password123',
          dob: '1985-12-18',
          sex: 'F',
          blood_type: 'O+'
        }).returning('id'),
        knex('users').insert({
          firstname: 'Test',
          lastname: 'Tester',
          email: 'test@test.com',
          password: 'password',
          dob: '1980-09-19',
          sex: 'M',
          blood_type: 'O+'
        }).returning('id')
      );
    }).then(function() {
      return Promise.join(
        knex('height_weight').insert({
          user_id: 30,
          height: 6.01,
          weight: 178,
          date: '2016-01-19 10:23:54'
        }).returning('id'),
        knex('height_weight').insert({
          user_id: 30,
          height: 6.01,
          weight: 180,
          date: '2016-02-20 10:23:54'
        })
      );
    }).then(function() {
      knex('health_events').insert({
        user_id: 30,
        type: 'surgery',
        name: 'Appendectomy',
        description: 'Emergency surgery to treat appendicitis',
        date: '2000-09-03'
      });
    }).then(function() {
      knex('health_categories').insert({

      });
    }).then(function() {
      knex('relations').insert({

      });
    });
};
