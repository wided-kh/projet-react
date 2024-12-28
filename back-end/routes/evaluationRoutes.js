const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

// Route pour ajouter une évaluation
router.post('/evaluations', evaluationController.addEvaluation);

// Route pour récupérer toutes les évaluations
router.get('/evaluations', evaluationController.getEvaluations);

module.exports = router;
