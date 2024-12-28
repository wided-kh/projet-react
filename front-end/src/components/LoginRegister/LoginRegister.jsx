import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaPhone, FaUser, FaAddressCard } from "react-icons/fa";
import YourImage from "../../assets/rh9.jfif";
import axios from 'axios';

const LoginRegister = ({ setIsAuthenticated, setUserRole }) => {
    const navigate = useNavigate();
    const [action, setAction] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState('');
    const [message, setMessage] = useState('');

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = { email, password };

        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', userData);
            setMessage('Connexion réussie !');
            setIsAuthenticated(true);
            localStorage.setItem('token', response.data.token);

            const userRole = response.data.user.role;
            setUserRole(userRole);
            if (userRole === 'user') {
                navigate('/user-dashboard');
            } else {
                navigate('/main');
            }
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Erreur de connexion');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = { email, password, firstName, lastName, phoneNumber, address, position };

        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', userData);
            setMessage('Inscription réussie !');
            setIsAuthenticated(true);
            localStorage.setItem('token', response.data.token);
            navigate('/login');
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Erreur d\'inscription');
        }
    };

    return (
        <div 
            className="flex items-center justify-center h-screen w-full" 
            style={{
                backgroundImage: `url(${YourImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
            }}
        >
            <div className={`wrapper ${action} bg-black bg-opacity-50 border-2 border-white rounded-lg shadow-lg transition-all duration-200 ease-in-out p-8`}>
                {/* Formulaire de Connexion */}
                <div className={`form-box login ${action === ' active' ? 'hidden' : 'block'}`}>
                    <form onSubmit={handleLogin}>
                        <h1 className="text-3xl text-center text-white font-bold mb-6">Connexion</h1>
                        <div className="input-box mb-4 relative">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="w-full h-12 bg-transparent border-b border-white text-white placeholder-white px-4"
                            />
                            <FaEnvelope className="absolute right-4 top-2 text-white" />
                        </div>
                        <div className="input-box mb-4 relative">
                            <input 
                                type="password" 
                                placeholder="Mot de passe" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="w-full h-12 bg-transparent border-b border-white text-white placeholder-white px-4"
                            />
                            <FaLock className="absolute right-4 top-2 text-white" />
                        </div>
                        <button type="submit" className="w-full h-12 mt-4 bg-white text-gray-800 rounded-full shadow-lg cursor-pointer font-semibold">
                            Connecter
                        </button>
                        <div className="register-link text-white text-sm text-center mt-4">
                            <p>Vous n'avez pas de compte? <a href="#" onClick={registerLink} className="text-white hover:underline">S'inscrire</a></p>
                        </div>
                        {message && <p className="text-center text-red-500">{message}</p>}
                    </form>
                </div>

                {/* Formulaire d'Inscription */}
                <div className={`form-box register ${action === ' active' ? 'block' : 'hidden'}`}>
                    <form onSubmit={handleRegister}>
                        <h1 className="text-3xl text-center text-white font-bold mb-6">Inscription</h1>
                        <div className="input-box mb-4 relative">
                            <input 
                                type="text" 
                                placeholder="Prénom" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                required 
                                className="w-full h-12 bg-transparent border-b border-white text-white placeholder-white px-4"
                            />
                            <FaUser className="absolute right-4 top-2 text-white" />
                        </div>
                        <div className="input-box mb-4 relative">
                            <input 
                                type="text" 
                                placeholder="Nom" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                required 
                                className="w-full h-12 bg-transparent border-b border-white text-white placeholder-white px-4"
                            />
                            <FaUser className="absolute right-4 top-2 text-white" />
                        </div>
                        <div className="input-box mb-4 relative">
                            <input 
                                type="tel" 
                                placeholder="Numéro de téléphone" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                required 
                                className="w-full h-12 bg-transparent border-b border-white text-white placeholder-white px-4"
                            />
                            <FaPhone className="absolute right-4 top-2 text-white" />
                        </div>
                        <div className="input-box mb-4 relative">
                            <input 
                                type="text" 
                                placeholder="Adresse" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                                required 
                                className="w-full h-12 bg-transparent border-b border-white text-white placeholder-white px-4"
                            />
                            <FaAddressCard className="absolute right-4 top-2 text-white" />
                        </div>
                        <div className="input-box mb-4 relative">
                            <input 
                                type="text" 
                                placeholder="Poste" 
                                value={position} 
                                onChange={(e) => setPosition(e.target.value)} 
                                required 
                                className="w-full h-12 bg-transparent border-b border-white text-white placeholder-white px-4"
                            />
                            <FaUser className="absolute right-4 top-2 text-white" />
                        </div>
                        <div className="input-box mb-4 relative">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="w-full h-12 bg-transparent border-b border-white text-white placeholder-white px-4"
                            />
                            <FaEnvelope className="absolute right-4 top-2 text-white" />
                        </div>
                        <div className="input-box mb-4 relative">
                            <input 
                                type="password" 
                                placeholder="Mot de passe" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="w-full h-12 bg-transparent border-b border-white text-white placeholder-white px-4"
                            />
                            <FaLock className="absolute right-4 top-2 text-white" />
                        </div>
                        <button type="submit" className="w-full h-12 mt-4 bg-white text-gray-800 rounded-full shadow-lg cursor-pointer font-semibold">
                            S'inscrire
                        </button>
                        <div className="login-link text-white text-sm text-center mt-4">
                            <p>Déjà un compte? <a href="#" onClick={loginLink} className="text-white hover:underline">Se connecter</a></p>
                        </div>
                        {message && <p className="text-center text-red-500">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
