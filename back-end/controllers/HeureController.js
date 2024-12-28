const Heure = require('../models/Heure');

// Récupérer toutes les heures
exports.getHeures = async (req, res) => {
  try {
    const heures = await Heure.find();
    res.json(heures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ajouter une nouvelle heure
exports.addHeure = async (req, res) => {
  const { employeeName, date, hoursWorked } = req.body;

  const newHeure = new Heure({
    employeeName,
    date,
    hoursWorked,
  });

  try {
    const savedHeure = await newHeure.save();
    res.status(201).json(savedHeure);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Modifier une heure existante
exports.updateHeure = async (req, res) => {
  try {
    const updatedHeure = await Heure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHeure);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une heure
exports.deleteHeure = async (req, res) => {
  try {
    await Heure.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Heure supprimée avec succès' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
