const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    position: { type: String },
    role: { type: String, default: 'user' }, // Par défaut, l'utilisateur est un 'user'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
