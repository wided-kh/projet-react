import React, { useState, useEffect } from "react";
import axios from 'axios';

// Fonction pour récupérer les informations de l'utilisateur
const getUserData = async (userId, token) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
  }
};

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    position: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur depuis le localStorage
      const token = localStorage.getItem('authToken'); // Récupérer le token d'authentification depuis le localStorage

      if (userId && token) {
        const data = await getUserData(userId, token);
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Informations mises à jour !");
    setIsEditing(false);  // Désactive le mode édition après la soumission
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Informations Personnelles</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Nom :</span>
            <input
              type="text"
              value={userData.firstName}
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
              className="text-lg text-gray-800 w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Prénom :</span>
            <input
              type="text"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
              className="text-lg text-gray-800 w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Email :</span>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="text-lg text-gray-800 w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Téléphone :</span>
            <input
              type="text"
              value={userData.phoneNumber}
              onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
              className="text-lg text-gray-800 w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Adresse :</span>
            <input
              type="text"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              className="text-lg text-gray-800 w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Poste :</span>
            <input
              type="text"
              value={userData.position}
              onChange={(e) => setUserData({ ...userData, position: e.target.value })}
              className="text-lg text-gray-800 w-2/3 p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={toggleEdit}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Nom :</span>
            <span className="text-lg text-gray-800">{userData.firstName}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Prénom :</span>
            <span className="text-lg text-gray-800">{userData.lastName}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Email :</span>
            <span className="text-lg text-gray-800">{userData.email}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Téléphone :</span>
            <span className="text-lg text-gray-800">{userData.phoneNumber}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Adresse :</span>
            <span className="text-lg text-gray-800">{userData.address}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-600 w-1/3">Poste :</span>
            <span className="text-lg text-gray-800">{userData.position}</span>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={toggleEdit}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            >
              Modifier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
