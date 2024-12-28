import React, { useState, useEffect } from "react";
import AdminSidebar from "../SidebarAdmin/AdminSidebar";

const LeaveList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Pour gérer l'état de la sidebar
  const [darkMode, setDarkMode] = useState(false); // Pour gérer le mode sombre
  const [loading, setLoading] = useState(true); // Pour gérer le chargement des données
  const [error, setError] = useState(null); // Pour gérer les erreurs

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/leave-requests");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const data = await response.json();
        setLeaveRequests(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const calculateLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclut le jour de départ
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 bg-gray-100 dark:bg-slate-800 transition-all ${
          isSidebarOpen ? "pl-64" : "pl-16"
        }`}
      >
        {/* Header */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
            Liste de tous les congés
          </h2>
        </div>

        {/* Erreur ou Chargement */}
        {loading ? (
          <div className="p-6 text-center text-gray-800 dark:text-gray-300">
            Chargement des demandes de congé...
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : (
          // Liste des congés
          <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-md">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-200 dark:bg-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                    Date de début
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                    Date de fin
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                    Motif
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                    Nombre de jours
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {leaveRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {request.startDate}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {request.endDate}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {request.reason}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {calculateLeaveDays(request.startDate, request.endDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveList;
