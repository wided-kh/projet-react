const jwt = require('jsonwebtoken'); // Ajouter l'importation de jwt
const Evaluation = require('../models/Evaluation');  // Import du modèle Evaluation
const User = require('../models/User');  // Assurez-vous d'importer le modèle User pour récupérer les informations de l'utilisateur

// Ajouter une nouvelle évaluation
exports.addEvaluation = async (req, res) => {
  try {
    // Vérification du token JWT pour obtenir l'utilisateur connecté
    const token = req.headers.authorization.split(' ')[1]; // Assurez-vous que le token est dans l'en-tête
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifiez le token avec la clé secrète

    const { firstName, lastName, date, score, comments } = req.body;

    // Créer une nouvelle évaluation
    const newEvaluation = new Evaluation({
      firstName,
      lastName,
      date,
      score,
      comments,
      user: decoded.userId // Enregistrer l'utilisateur connecté
    });

    // Sauvegarder l'évaluation dans la base de données
    await newEvaluation.save();

    // Retourner la réponse avec l'évaluation créée
    res.status(201).json(newEvaluation);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'évaluation:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Récupérer toutes les évaluations
exports.getEvaluations = async (req, res) => {
  try {
    // Vérification du token JWT pour obtenir l'utilisateur connecté
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifiez le token avec la clé secrète

    const evaluations = await Evaluation.find({ user: decoded.userId }); // Filtrer par utilisateur
    res.status(200).json(evaluations);
  } catch (error) {
    console.error("Erreur lors de la récupération des évaluations:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.getEvaluationsByUser = async (req, res) => {
  try {
    // Récupérer l'utilisateur connecté (par exemple, depuis le token JWT)
    const userId = req.user.id;  // Si vous utilisez JWT pour l'authentification

    // Récupérer les évaluations associées à cet utilisateur
    const evaluations = await Evaluation.find({ userId: userId });

    if (evaluations.length === 0) {
      return res.status(404).json({ message: 'Aucune évaluation trouvée pour cet utilisateur' });
    }

    // Répondre avec les évaluations trouvées
    res.status(200).json(evaluations);
  } catch (error) {
    console.error('Erreur lors de la récupération des évaluations:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
