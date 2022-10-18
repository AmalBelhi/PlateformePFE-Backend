const express = require('express');
const Enseignant = require('../models/enseignantModel');
const jwt = require('jsonwebtoken');
var ObjectID = require('mongoose').Types.ObjectId
const bcrypt = require("bcryptjs");
const passport = require('passport');
const router = express.Router();


router.route("/addTeacher").post((req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const enseignant = new Enseignant({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: hash
    });
    enseignant.save()
      .then(() => res.status(201).json({ message: 'Enseignant créé !' }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }))
});

router.post('/login', (req, res, next) => {
  Enseignant.findOne({ email: req.body.email })
  .then(enseignant => {
    if (!enseignant) {
      return res.status(401).json({ error: 'Enseignant non trouvé !' });
    }
    bcrypt.compare(req.body.password, enseignant.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          enseignantId: enseignant._id,
          token: 'TOKEN'
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
});


router.get('/:id/etudiants', async (req, res, next) => {

  const { id } = req.params;
  const enseignant = await Enseignant.findById(id).populate('etudiants');

   res.send(enseignant.etudiants);
});
 

router.post('/', (req, res, next) => {
  const enseignant = new Enseignant({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
    tel: req.body.tel,
    

  });
  enseignant.save().then(
    () => {
      res.status(201).json({
        message: 'Enseignant ajouté avec succées !'
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
  Enseignant.findOne({
    _id: req.params.id
  }).then(
    (enseignant) => {
      res.status(200).json(enseignant);
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
  Enseignant.updateOne(
    { _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Enseignant modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

router.delete('/:id', (req, res, next) => {
  Enseignant.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Enseignant supprimé!'
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

router.get('/' +
  '', (req, res, next) => {
    Enseignant.find().then(
    (enseignants) => {
      res.status(200).json(enseignants);
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