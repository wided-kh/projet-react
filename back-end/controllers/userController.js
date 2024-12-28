const User = require('../models/User');

// Récupérer tous les utilisateurs ayant le rôle "user"
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }); // Filtrage par rôle "user"
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, address, position, role } = req.body;

    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        position,
        role
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour un utilisateur par ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber, address, position, role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            position,
            role
        }, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer un utilisateur par ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = { getAllUsers, createUser, updateUser, deleteUser };
