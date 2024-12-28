const Notification = require('../models/Notification');

// Récupérer toutes les notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des notifications', error: err });
  }
};

// Ajouter une nouvelle notification
exports.addNotification = async (req, res) => {
  const { text, date } = req.body;
  try {
    const newNotification = new Notification({ text, date });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la notification', error: err });
  }
};

// Supprimer une notification
exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    await Notification.findByIdAndDelete(id);
    res.json({ message: 'Notification supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la notification', error: err });
  }
};
