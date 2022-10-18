const express = require('express');
const Etudiant = require('../models/etudiantsModel');
const Projet = require('../models/projetModel');
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport');
var ObjectID = require('mongoose').Types.ObjectId

const router = express.Router();



router.route("/addStudent").post((req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const etudiant = new Etudiant({
      nom: req.body.nom,
      prenom: req.body.prenom,
      cin: req.body.cin,
      email: req.body.email,
      password: hash
    });
    etudiant.save()
      .then(() => res.status(201).json({ message: 'Etudiant créé !' }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }))
});

router.post('/login', (req, res, next) => {
  Etudiant.findOne({ email: req.body.email })
  .then(etudiant => {
    if (!etudiant) {
      return res.status(401).json({ error: 'Etudiant non trouvé !' });
    }
    bcrypt.compare(req.body.password, etudiant.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          etudiantId: etudiant._id,
          token: 'TOKEN'
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
});



router.get(
'/current' , (req , res,) => {
  res.json({
    id: req.etudiant.id,
    name: req.etudiant.name,
    email: req.etudiant.email
  });
}
);

// cette fonction permet d'afficher l'enseignant qui va encadrer l'etudiant
router.get('/:id/enseignant', async (req, res, next) => {

  const { id } = req.params;
  const etudiant = await Etudiant.findById(id).populate('enseignant');

   res.send(etudiant.enseignant);
});

router.get('/:id/projet', async (req, res, next) => {

  const { id } = req.params;
  const etudiant = await Etudiant.findById(id).populate('projet');

   res.send(etudiant.projet);
});

// Ajouter un etduiant
router.post('/', (req, res, next) => {
  const etudiant = new Etudiant({
    cin: req.body.cin,
    nom: req.body.nom,
    prenom: req.body.prenom,
    sexe: req.body.sexe,
    imageUrl: req.body.imageUrl,
    email: req.body.email,
    password: req.body.password,
    date_naissance: req.body.date_naissance,
    tel: req.body.tel,
    etat: req.body.etat,
    
  });
  etudiant.save().then(
    () => {
      res.status(201).json({
        message: 'Etudiant ajouté avec succées !'
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
  Etudiant.findOne({
    _id: req.params.id
  }).then(
    (etudiant) => {
      res.status(200).json(etudiant);
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
  Etudiant.updateOne(
    { _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

router.delete('/:id', (req, res, next) => {
  Etudiant.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
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
  Etudiant.find().then(
    (etudiants) => {
      res.status(200).json(etudiants);
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