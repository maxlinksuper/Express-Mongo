const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/devs').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('devs')
    .find({})
    .limit(10)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching devs!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/devs').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const devDocument = {
    _id: crypto.randomBytes(12).toString('hex'),
    developer: req.body.developer,
    type: req.body.type,
    wage: req.body.wage,
    projects: req.body.projects,
    datejoined: new Date(),
  };

  dbConnect.collection('devs').insertOne(devDocument, function (err, result) {
    if (err) {
      res.status(400).send('Error inserting developer!');
    } else {
      console.log(`Added a new developer with id ${result.insertedId}`);
      res.status(204).send();
    }
  });
});

// This section will help you update a record by id.
recordRoutes.route('/devs/:id').put(function (req, res) {
  const dbConnect = dbo.getDb();
  const devQuery = { _id: mongoose.Types.ObjectId(req.params.id) };
  const updates = [
    {
      $set: {
        developer: req.body.developer,
        type: req.body.type,
        wage: req.body.wage,
        projects: req.body.projects,
        dateJoined: req.body.dateJoined,
      },
    },
  ];

  dbConnect
    .collection('devs')
    .updateOne(devQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating developer name with id ${devQuery._id}!`);
      } else {
        console.log('Updated 1 document');
        res.json(_result);
      }
    });
});

// This section will help you delete a record.
recordRoutes.route('/devs/:id').delete((req, res) => {
  const dbConnect = dbo.getDb();
  const devQuery = { _id: mongoose.Types.ObjectId(req.params.id) };

  dbConnect.collection('devs').deleteOne(devQuery, function (err, _result) {
    if (err) {
      res.status(400).send(`Error deleting developer with id ${devQuery._id}!`);
    } else {
      console.log('Deleted 1 document');
      res.json(_result);
    }
  });
});

module.exports = recordRoutes;
