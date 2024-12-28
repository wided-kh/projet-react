import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaveRequestsUser = () => {
  const [name, setName] = useState("");  // Le nom de l'utilisateur
  const [reason, setReason] = useState("");  // Motif du congé
  const [startDate, setStartDate] = useState("");  // Date de début
  const [endDate, setEndDate] = useState("");  // Date de fin
  const [message, setMessage] = useState("");  // Message de confirmation ou erreur

  // Liste des demandes de congé
  const [leaveRequests, setLeaveRequests] = useState([]);
  
  // Supposons que vous obtenez l'utilisateur connecté via un token JWT ou autre méthode
  const currentUser = localStorage.getItem('currentUser'); // Remplacez par votre logique pour récupérer l'utilisateur connecté

  // Fonction pour récupérer les demandes de congé de l'utilisateur connecté
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/leave-requests");
      setLeaveRequests(response.data); // Assurez-vous que la réponse contient la liste des demandes
    } catch (error) {
      setMessage("Erreur lors de la récupération des demandes de congé.");
    }
  };

  // Appel de la fonction pour récupérer les demandes lorsque le composant est monté
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Filtrer les demandes de congé pour l'utilisateur connecté
  const filteredRequests = leaveRequests.filter(
    (request) => request.name === currentUser
  );

  // Soumettre une demande de congé
  const handleLeaveRequest = async () => {
    if (name && reason && startDate && endDate) {
      const newRequest = {
        name,
        reason,
        startDate,
        endDate,
      };

      try {
        const response = await axios.post("http://localhost:4000/api/leave-requests", newRequest);
        const savedRequest = response.data;
        setLeaveRequests((prevRequests) => [...prevRequests, savedRequest]);
        setMessage("Demande envoyée avec succès.");
        setName("");
        setReason("");
        setStartDate("");
        setEndDate("");
      } catch (error) {
        setMessage("Erreur lors de l'envoi de la demande.");
      }
    } else {
      setMessage("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Formulaire de demande de congé */}
      <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-700">Soumettre une demande de congé</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          id="name"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Motif du congé</label>
        <textarea
          id="reason"
          placeholder="Motif du congé"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Date de début</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date de fin</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <button
        onClick={handleLeaveRequest}
        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Soumettre la demande
      </button>

      {message && (
        <p className={`mt-4 text-center font-medium ${message === "Demande envoyée avec succès." ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      {/* Tableau historique des demandes */}
      <div className="mt-8 overflow-x-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-700">Historique des demandes de congé</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-indigo-100 text-indigo-700 text-left">
              <th className="px-6 py-3 font-medium">Nom</th>
              <th className="px-6 py-3 font-medium">Motif</th>
              <th className="px-6 py-3 font-medium">Date de début</th>
              <th className="px-6 py-3 font-medium">Date de fin</th>
              <th className="px-6 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 text-gray-700">{request.name}</td>
                  <td className="px-6 py-4 text-gray-700">{request.reason}</td>
                  <td className="px-6 py-4 text-gray-700">{request.startDate}</td>
                  <td className="px-6 py-4 text-gray-700">{request.endDate}</td>
                  <td className="px-6 py-4 text-gray-700">
                    <span className={`inline-block py-1 px-3 text-sm font-semibold rounded-full ${request.status === "En attente" ? "bg-yellow-200 text-yellow-800" : request.status === "Acceptée" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Aucune demande trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequestsUser;
