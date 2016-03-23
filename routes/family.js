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
  knex('relations_height_weight').update({
      height: req.body.height,
      weight: req.body.weight,
      date: req.body.date
    })
    .where({
      user_id: user_id
    })
    .andWhere({
      relation_id: relation_id,
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
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where({
      user_id: user_id
    })
    .andWhere('relationship', 'mother')
    .orWhere('relationship', 'father')
    .orWhere('relationship', 'sister')
    .orWhere('relationship', 'brother')
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });
});


// GET route for viewing a mother's side
router.get('/:id/mothers', function(req, res) {
  var user_id = req.params.id;
  //TODO get family relations data
  knex('relations')
    .select('*')
    .where('user_id', user_id).andWhere('relationship', 'like', 'mothers%')
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
    .where('user_id', user_id).andWhere('relationship', 'like', 'fathers%')
    .then(function(data, err) {
      if (!checkError(res, err)) {
        res.json(data);
      }
    });
});

//GET route for viewing relations health eventsprofile
router.get('/:id/profile/:relation_id', function(req, res) {
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  console.log(res.body);
  knex('relations_health_events').select('*').where({
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

//GET route for viewing relations health categories
router.get('/:id/categories/:relation_id', function(req, res) {
  var user_id = req.params.id;
  var relation_id = req.params.relation_id;
  console.log(res.body);
  knex('relations_health_categories').select('*').where({
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

module.exports = router;
