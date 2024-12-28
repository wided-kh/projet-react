const mongoose = require('mongoose');

// Schéma de l'évaluation
const evaluationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },  // Prénom de l'utilisateur
  lastName: { type: String, required: true },   // Nom de l'utilisateur
  date: { type: Date, required: true },         // Date de l'évaluation
  score: { type: Number, required: true, min: 0, max: 100 }, // Score entre 0 et 100
  comments: { type: String, default: '' }       // Commentaires, avec une valeur par défaut
});

// Modèle Mongoose basé sur le schéma
const Evaluation = mongoose.model('Evaluation', evaluationSchema);  // Nom du modèle et schéma

module.exports = Evaluation;
