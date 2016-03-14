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
        }).returning('id')
      );
    }).then(function() {
      return Promise.join(
        knex('health_events').insert({
          user_id: 30,
          type: 'surgery',
          name: 'Appendectomy',
          description: 'Emergency surgery to treat appendicitis',
          date: '2000-09-03'
        }).returning('id'),
        knex('health_events').insert({
          user_id: 30,
          type: 'illness',
          name: 'Chicken Pox',
          description: 'Got from child at preschool',
          date: '1989-10-07'
        }).returning('id')
      );
    }).then(function() {
      return Promise.join(
        knex('health_categories').insert({
          user_id: 30,
          type: 'food_allergy',
          name: 'Wheat',
          description: 'Reaction to noodles prompted doctor visit',
          date: '1989-05-12'
        }).returning('id'),
        knex('health_categories').insert({
          user_id: 30,
          type: 'drug_allergy',
          name: 'Asprin',
          description: 'Reaction after taken for muscle soreness',
          date: '2002-03-11'
        }).returning('id')
      );
    }).then(function() {
      return Promise.join(
        knex('relations').insert({
          user_id: 30,
          name: 'Steve',
          relationship: 'brother'
        }).returning('id'),
        knex('relations').insert({
          user_id: 30,
          name: 'Sue',
          relationship: 'sister'
        }).returning('id'),
        knex('relations').insert({
          user_id: 30,
          name: 'Joan',
          relationship: 'mother'
        }).returning('id'),
        knex('relations').insert({
          user_id: 30,
          name: 'David',
          relationship: 'father'
        }).returning('id'),
        knex('relations').insert({
          user_id: 30,
          name: 'Donald',
          relationship: 'father\'s father'
        }).returning('id'),
        knex('relations').insert({
          user_id: 30,
          name: 'Genie',
          relationship: 'mother\'s mother'
        }).returning('id'),
        knex('relations').insert({
          user_id: 30,
          name: 'Sherry',
          relationship: 'father\'s mother'
        }).returning('id'),
        knex('relations').insert({
          user_id: 30,
          name: 'Jim',
          relationship: 'mother\'s father'
        }).returning('id')
      );
    });
};
