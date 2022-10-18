const express = require('express');
const Annee = require('../models/anneeModel');
const jwt = require('jsonwebtoken');
var ObjectID = require('mongoose').Types.ObjectId

const router = express.Router();


router.post('/', (req, res, next) => {
  const annee = new Annee({
    aa: req.body.aa,
    dateDepot: req.body.dateDepot,
    dateFermeture: req.body.dateFermeture,
    

  });
  annee.save().then(
    () => {
      res.status(201).json({
        message: 'Année universitaire ajouté avec succées !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

router.get('/:id', (req, res, next) => {
  Annee.findOne({
    _id: req.params.id
  }).then(
    (annee) => {
      res.status(200).json(annee);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});

router.put('/:id', (req, res) => {
  Annee.updateOne(
    { _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Année universitaire modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

router.get('/' +
  '', (req, res, next) => {
    Annee.find().then(
    (annees) => {
      res.status(200).json(annees);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});


module.exports = router;