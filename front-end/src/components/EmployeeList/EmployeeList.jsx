import React, { useState, useEffect } from 'react';
import AdminSidebar from "../SidebarAdmin/AdminSidebar";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

const EmployeeList = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Pour ouvrir/fermer la modale
  const [currentEmployee, setCurrentEmployee] = useState(null); // L'employé sélectionné pour la modification
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    position: '',
  });

  // Récupérer la liste des utilisateurs
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users');  // Assurez-vous que l'URL est correcte
        setEmployees(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des employés", err);
      }
    };

    fetchEmployees();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Supprimer un utilisateur
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);  // Assurez-vous que l'URL est correcte
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'employé", err);
    }
  };

  // Ouvrir la modale pour modifier un employé
  const openEditModal = (employee) => {
    setCurrentEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      address: employee.address,
      position: employee.position,
    });
    setIsModalOpen(true);
  };

  // Fermer la modale
  const closeEditModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee(null);
  };

  // Mettre à jour un employé
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/users/${currentEmployee._id}`, formData);
      setEmployees(employees.map(emp => (emp._id === currentEmployee._id ? response.data : emp)));
      closeEditModal();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'employé", err);
    }
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 bg-gray-100 dark:bg-slate-800 transition-all ${isSidebarOpen ? 'pl-64' : 'pl-16'}`}>
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-300">Liste des Employés</h2>
        </div>

        <div className="p-6">
          <table className="min-w-full bg-white dark:bg-slate-700 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Prénom</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Numéro de téléphone</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Adresse</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Position</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="border-b border-gray-200 dark:border-slate-600">
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{employee.lastName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{employee.firstName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{employee.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{employee.phoneNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{employee.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{employee.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 flex gap-3">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => openEditModal(employee)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => deleteEmployee(employee._id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale de modification */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">Modifier l'Employé</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none dark:bg-slate-700 dark:text-gray-300"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none dark:bg-slate-700 dark:text-gray-300"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none dark:bg-slate-700 dark:text-gray-300"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Numéro de téléphone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none dark:bg-slate-700 dark:text-gray-300"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none dark:bg-slate-700 dark:text-gray-300"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none dark:bg-slate-700 dark:text-gray-300"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
