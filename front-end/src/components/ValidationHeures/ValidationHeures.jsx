import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from "../SidebarAdmin/AdminSidebar"; // Assurez-vous que le chemin est correct
import { FaCheckSquare, FaEdit, FaTrash } from 'react-icons/fa'; // Importation des icônes supplémentaires

const ValidationHeures = () => {
  const [heures, setHeures] = useState([]);
  const [newHeure, setNewHeure] = useState({
    employeeName: '',
    date: '',
    hoursWorked: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [isSidebarOpen, setSidebarOpen] = useState(true); // Gérer l'état de la sidebar
  const [darkMode, setDarkMode] = useState(false); // Gérer le mode sombre

  // Récupérer les heures depuis l'API
  const fetchHeures = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/heures');
      setHeures(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des heures:', error);
    }
  };

  // Charger les heures au démarrage du composant
  useEffect(() => {
    fetchHeures();
  }, []);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHeure((prev) => ({ ...prev, [name]: value }));
  };

  // Ajouter ou modifier les heures
  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (newHeure.employeeName && newHeure.date && newHeure.hoursWorked) {
      if (isEditing) {
        // Modification d'une heure existante
        try {
          const response = await axios.put(`http://localhost:4000/api/heures/${editId}`, newHeure);
          setHeures(heures.map((heure) => (heure._id === editId ? response.data : heure)));
          setIsEditing(false);
          setEditId(null);
        } catch (error) {
          console.error('Erreur lors de la modification des heures:', error);
        }
      } else {
        // Ajout d'une nouvelle heure
        try {
          const response = await axios.post('http://localhost:4000/api/heures', newHeure);
          setHeures((prev) => [...prev, response.data]);
        } catch (error) {
          console.error('Erreur lors de l\'ajout des heures:', error);
        }
      }
      setNewHeure({ employeeName: '', date: '', hoursWorked: '' });
    } else {
      alert('Veuillez remplir tous les champs !');
    }
  };

  // Supprimer une entrée d'heures
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/heures/${id}`);
      setHeures(heures.filter((heure) => heure._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression des heures:', error);
    }
  };

  // Remplir le formulaire avec les données pour la modification
  const handleEdit = (heure) => {
    setNewHeure({ employeeName: heure.employeeName, date: heure.date, hoursWorked: heure.hoursWorked });
    setIsEditing(true);
    setEditId(heure._id);
  };

  return (
    <div className={`flex ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Main content */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl mx-auto flex-1 ml-64">
        <div className="flex items-center mb-6">
          <FaCheckSquare className="text-green-500 text-4xl mr-3" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Validation des heures</h2>
        </div>

        {/* Formulaire d'ajout ou modification */}
        <form className="mb-8" onSubmit={handleAddOrEdit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <input
              type="text"
              name="employeeName"
              placeholder="Nom de l'employé"
              value={newHeure.employeeName}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
            />
            <input
              type="date"
              name="date"
              value={newHeure.date}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
            />
            <input
              type="number"
              name="hoursWorked"
              placeholder="Heures travaillées"
              value={newHeure.hoursWorked}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            {isEditing ? 'Modifier les heures' : 'Ajouter les heures'}
          </button>
        </form>

        {/* Table des heures validées */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">Nom</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">Date</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">Heures travaillées</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {heures.map((heure) => (
              <tr key={heure._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{heure.employeeName}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{heure.date}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{heure.hoursWorked} heures</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(heure)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(heure._id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValidationHeures;
