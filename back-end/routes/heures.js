const express = require('express');
const router = express.Router();
const HeureController = require('../controllers/HeureController');

// Récupérer toutes les heures
router.get('/', HeureController.getHeures);

// Ajouter une nouvelle heure
router.post('/', HeureController.addHeure);

// Modifier une heure existante
router.put('/:id', HeureController.updateHeure);

// Supprimer une heure
router.delete('/:id', HeureController.deleteHeure);

module.exports = router;
