import React, { useState, useEffect } from 'react';
import AdminSidebar from "../SidebarAdmin/AdminSidebar";
import { FaBell, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

const GestionNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Gérer l'état de la sidebar

  // Récupérer les notifications depuis l'API
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Gérer les changements dans le champ de texte
  const handleChange = (e) => {
    setNewNotification(e.target.value);
  };

  // Ajouter une nouvelle notification
  const handleAddNotification = async (e) => {
    e.preventDefault();
    if (newNotification.trim()) {
      const newNotif = {
        text: newNotification,
        date: new Date().toLocaleString(),
      };
      try {
        const response = await axios.post('http://localhost:4000/api/notifications', newNotif);
        setNotifications((prev) => [...prev, response.data]);
        setNewNotification('');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la notification:', error);
      }
    } else {
      alert('Veuillez entrer un texte pour la notification.');
    }
  };

  // Supprimer une notification
  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/notifications/${id}`);
      setNotifications(notifications.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la notification:', error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div
        className={`flex-1 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl mx-auto transition-all ${isSidebarOpen ? 'pl-64' : 'pl-16'}`}
      >
        <div className="flex items-center mb-6">
          <FaBell className="text-green-500 text-4xl mr-3" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Gestion des Notifications</h2>
        </div>

        {/* Formulaire centré pour ajouter une notification */}
        <div className="flex justify-center mb-8">
          <form onSubmit={handleAddNotification} className="w-full max-w-lg bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md space-y-4">
            <textarea
              value={newNotification}
              onChange={handleChange}
              placeholder="Entrez une nouvelle notification..."
              className="p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Ajouter une notification
            </button>
          </form>
        </div>

        {/* Liste des notifications */}
        <table className="w-full text-left border-collapse mt-8">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">Notification</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">Date</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notif) => (
              <tr key={notif._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{notif.text}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{notif.date}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteNotification(notif._id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FaTrashAlt className="inline mr-1" /> {/* Action supprimer notification */}
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

export default GestionNotifications;
