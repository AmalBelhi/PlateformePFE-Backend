const express = require('express');
const Projet = require('../models/projetModel');
const Etudiant = require('../models/etudiantsModel');

const jwt = require('jsonwebtoken');
var ObjectID = require('mongoose').Types.ObjectId

const router = express.Router();

// cette fonction permet a un etudiant de creer un projet
router.post('/:id', async(req, res) => {

  etudiant = req.params;
  id = etudiant.id;
  
  const { nom, societe, descriptionSociete, definitionProjet, objectifProjet, besoins, technologies} = req.body;
  const projet = await Projet.create({
    nom, societe, descriptionSociete, definitionProjet, objectifProjet, besoins, technologies, 
    etudiant:id
  });
  
  await projet.save().then(
    () => {
      res.status(201).json({
        message: 'Projet ajouté avec succées !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );;

  const etudiantById = await Etudiant.findById(id);

  etudiantById.projet.push(projet);
  await etudiantById.save();

  return res.send(etudiantById);

});

//cette fonction permet d'afficher l'etudiant ainsi que le projet qui a creer

router.get('/:id', async(req, res) => {
  const { id } = req.params;

  const projet = await Projet.findById(id).populate('etudiant')
  const etudiant = await Etudiant.findById(projet.etudiant).populate('projet')
  .then(
    (projet, etudiant) => {
      res.status(200).json(projet, etudiant);
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
  Projet.updateOne(
    { _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Projet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

router.get('/' +
  '', (req, res, next) => {
    Projet.find().then(
    (projets) => {
      res.status(200).json(projets);
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