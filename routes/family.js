'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

//Error handling
function checkError(res, err) {
  var fail = false;
  if (err) {
    fail = true;
    res.send(err);
  }
  return fail;
}


// POST route for creating a new family
router.post('/:id', function(req, res) {
  var user_id = req.params.id;
  // console.log(req.body);
  knex('relations').insert({
    user_id: user_id,
    name: req.body.name,
    relationship: req.body.relationship,
    dob: req.body.dob,
    dod: req.body.dod,
    sex: req.body.sex,
    blood_type: req.body.blood_type
  }).then(function(data, err) {
    if (!checkError(res, err)) {
      res.send('Success!');
    }
  });
});

// POST route for updating family member profile
router.post('/:id/edit/:relation_id', function(req, res) {
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  // console.log(req.body);
  knex('relations')
    .where({
      id: relation_id
    })
    .andWhere({
      user_id: user_id
    })
    .update({
      name: req.body.name,
      relationship: req.body.relationship,
      dob: req.body.dob,
      dod: req.body.dod,
      sex: req.body.sex,
      blood_type: req.body.blood_type
    }).then(function(data, err) {
      if (!checkError(res, err)) {
        res.send('Success!');
      }
    });
});

// POST route for creating a new health event for family member
router.post('/:id/events/:relation_id', function(req, res) {
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  // console.log(req.body);
  knex('relations_health_events').insert({
      user_id: user_id,
      relation_id: relation_id,
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      date: req.body.date
    })
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.send('Success!');
      }
    });
});

// POST route for creating new health categories for family member
router.post('/:id/categories/:relation_id', function(req, res) {
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  // console.log(req.body);
  knex('relations_health_categories').insert({
      user_id: user_id,
      relation_id: relation_id,
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      date: req.body.date
    })
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.send('Success!');
      }
    });
});

// POST route for creating height and weight for family member
router.post('/:id/hw/:relation_id', function(req, res) {
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  // console.log(req.body);
  knex('relations_height_weight').insert({
      user_id: user_id,
      relation_id: relation_id,
      height: req.body.height,
      weight: req.body.weight,
      date: req.body.date
    })
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.send('Success!');
      }
    });
});

//GET route for viewing immediate family
router.get('/:id', function(req, res) {
  var user_id = req.params.id;
  var arry = [];
  // console.log(user_id);
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where('user_id', user_id)
    .andWhere('relationship', 'Mother')
    .then(function(data, err) {
      if(data[0] !== undefined){
      arry.push(data[0]);
      }
      // console.log(data[0]);
      knex('relations')
        .select('*')
        .where('user_id', user_id)
        .andWhere('relationship', 'Father')
        .then(function(data, err) {
          // console.log(data[0]);
          if(data[0] !== undefined){
          arry.push(data[0]);
          }

          knex('relations')
            .select('*')
            .where('user_id', user_id)
            .andWhere('relationship', 'Sister')
            .then(function(data, err) {
              if(data[0] !== undefined){
              arry.push(data[0]);
              }
              knex('relations')
                .select('*')
                .where('user_id', user_id)
                .andWhere('relationship', 'Brother')
                .then(function(data, err) {
                  if(data[0] !== undefined){
                  arry.push(data[0]);
                  }
                  if (!checkError(res, err)) {
                    // console.log(data);
                    res.json(arry);
                  }
                });
            });
        });
    });
});

// GET route for viewing a mother's side
router.get('/:id/mothers', function(req, res) {
  var user_id = req.params.id;
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where('user_id', user_id).andWhere('relationship', 'like', 'Mother\'s%')
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });
});

// GET route for viewing a father's side
router.get('/:id/fathers', function(req, res) {
  var user_id = req.params.id;
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where('user_id', user_id).andWhere('relationship', 'like', 'Father\'s%')
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });
});

//GET route for viewing healthevents for single family member
router.get('/:id/profile/:relation_id', function(req, res) {
  var start;
  var end;
  if (typeof req.query.start !== 'undefined' && typeof req.query.end !== 'undefined') {
    start = parseInt(req.query.start);
    end = parseInt(req.query.end);
  } else {
    start = 1800;
    end = new Date().getFullYear();
  }
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  knex('relations_health_events').select('*').where({
      user_id: user_id
    }).andWhere({
      relation_id: relation_id
    })
    .then(function(data, err) {
      // console.log('in the then')
      // console.log(data);
      var obj = [];
      if (!checkError(res, err)) {
        for (var i = 0; i < data.length; i++) {
          // console.log(typeof data[i].date);
          if (typeof data[i].date === 'string') {
            // console.log('string');
            var year = data[i].date.slice(0, 4);
            // console.log(year);
            if (year >= start && year <= end) {
              // console.log(data[i]);
              obj.push(data[i]);
            }
          } else {
            var yr = data[i].date.getFullYear();
            if (yr >= start && yr <= end) {
              // console.log(data[i]);
              obj.push(data[i]);
            }
          }

        }
        // console.log(obj);
        res.json(obj);
      }
    });

});

//GET route for viewing health categories for single family member
router.get('/:id/categories/:relation_id', function(req, res) {
  var start;
  var end;
  if (typeof req.query.start !== 'undefined' && typeof req.query.end !== 'undefined') {
    start = parseInt(req.query.start);
    end = parseInt(req.query.end);
  } else {
    start = 1800;
    end = new Date().getFullYear();
  }
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  knex('relations_health_categories').select('*').where({
      user_id: user_id
    }).andWhere({
      relation_id: relation_id
    })
    .then(function(data, err) {
      var obj = [];
      if (!checkError(res, err)) {
        for (var i = 0; i < data.length; i++) {
          // console.log(typeof data[i].date);
          if (typeof data[i].date === 'string') {
            // console.log('string');
            var year = data[i].date.slice(0, 4);
            // console.log(year);
            if (year >= start && year <= end) {
              // console.log(data[i]);
              obj.push(data[i]);
            }
          } else {
            var yr = data[i].date.getFullYear();
            if (yr >= start && yr <= end) {
              // console.log(data[i]);
              obj.push(data[i]);
            }
          }
        }
        res.json(obj);
      }
    });

});

//GET route for viewing relations health eventsprofile by name of health event
router.get('/:id/healthevents/:name', function(req, res) {
  var user_id = req.params.id;
  var name = req.params.name;
  knex('relations_health_events').select('*').where({
      user_id: user_id
    }).andWhere({
      name: name
    })
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });

});

//GET route for viewing relations health categories by name of health category
router.get('/:id/healthcategories/:name', function(req, res) {
  var user_id = req.params.id;
  var name = req.params.name;
  // console.log(res.body);
  knex('relations_health_categories').select('*').where({
      user_id: user_id
    }).andWhere({
      name: name
    })
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });

});

//GET route for viewing relationship to relation
router.get('/:id/relation/:relation_id', function(req, res) {
  var user_id = req.params.id;
  var id = req.params.relation_id;
  knex('relations').select('*').where({
      user_id: user_id
    }).andWhere({
      id: id
    })
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });

});

//GET route for viewing height and weight of relation
router.get('/:id/hw/:relation_id', function(req, res) {
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  knex('relations_height_weight').select('*').where({
      user_id: user_id
    }).andWhere({
      relation_id: relation_id
    })
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });

});

//GET route for viewing all health_events for a family
router.get('/:id/events/', function(req, res) {
  var user_id = req.params.id;
  // console.log(res.body);
  knex('relations_health_events').select('name', 'relation_id').where({
      user_id: user_id
    })
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });

});

//GET route for viewing family members
router.get('/:id/relations/:relation_id', function(req, res) {
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  // console.log(req.body);
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where({
      user_id: user_id
    })
    .andWhere('id', relation_id)
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });
});

//GET route for viewing all health_categories for a family
router.get('/:id/categories/', function(req, res) {
  var user_id = req.params.id;
  // console.log(res.body);
  knex('relations_health_categories').select('name', 'relation_id').where({
      user_id: user_id
    })
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });

});

module.exports = router;
