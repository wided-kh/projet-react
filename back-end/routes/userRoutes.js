// routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); 
const userController = require('../controllers/userController');// Assurez-vous d'avoir un modèle pour les utilisateurs
const router = express.Router();



// Récupérer tous les employés
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Récupère tous les utilisateurs depuis la base de données
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des employés" });
    }
});

router.get("/:id", async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.put('/:id', userController.updateUser);

// Supprimer un utilisateur par ID
router.delete('/:id', userController.deleteUser);
module.exports = router;
