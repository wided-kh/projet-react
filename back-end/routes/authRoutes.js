const express = require('express');
const { register, login } = require('../controllers/authController');
const authRouter = express.Router();

// Route pour l'inscription
authRouter.post('/register', register);

// Route pour la connexion
authRouter.post('/login', login);

module.exports = authRouter;
