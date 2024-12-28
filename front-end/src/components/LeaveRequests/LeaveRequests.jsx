import React, { useState, useEffect } from "react";
import AdminSidebar from "../SidebarAdmin/AdminSidebar";

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/leave-requests");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const data = await response.json();
        setLeaveRequests(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchLeaveRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const response = await fetch(`http://localhost:4000/api/leave-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: action, // "accept" ou "refuse"
        }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'acceptation ou du refus de la demande.");
      }
      const updatedRequest = await response.json();
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: updatedRequest.status } : request
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 bg-gray-100 dark:bg-slate-800 transition-all ${isSidebarOpen ? 'pl-64' : 'pl-16'}`}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Congés en attente</h2>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-md">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-200 dark:bg-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Date de début</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Date de fin</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Motif</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {leaveRequests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{request.name}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{new Date(request.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{new Date(request.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{request.reason}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    <button
                      aria-label="Accepter la demande"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                      onClick={() => handleAction(request._id, "accepted")}
                    >
                      Accepter
                    </button>
                    <button
                      aria-label="Refuser la demande"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                      onClick={() => handleAction(request._id, "refused")}
                    >
                      Refuser
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
