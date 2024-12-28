import React, { useState, useEffect } from "react";
import AdminSidebar from "../SidebarAdmin/AdminSidebar";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [newEvaluation, setNewEvaluation] = useState({
    firstName: "",  
    lastName: "",   
    date: "",
    score: "",
    comments: "",
  });
  const [user, setUser] = useState(null); // État pour l'utilisateur connecté
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Récupérer l'utilisateur connecté via le token JWT
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Décodez le JWT
      setUser({ firstName: decoded.firstName, lastName: decoded.lastName }); // Sauvegarder les informations de l'utilisateur connecté
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/evaluations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Envoi du token pour récupérer les évaluations filtrées
        },
      })
      .then((response) => {
        setEvaluations(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des évaluations :", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvaluation((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvaluation = (e) => {
    e.preventDefault();
    const { firstName, lastName, date, score, comments } = newEvaluation;

    if (!firstName || !lastName || !date || !score) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const evaluationData = {
      firstName,
      lastName,
      date,
      score,
      comments,
    };

    axios
      .post("http://localhost:4000/api/evaluations", evaluationData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Envoi du token pour ajouter une évaluation
        },
      })
      .then((response) => {
        setEvaluations((prev) => [response.data, ...prev]);
        setNewEvaluation({ firstName: "", lastName: "", date: "", score: "", comments: "" });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'évaluation :", error);
        alert("Erreur lors de l'ajout de l'évaluation.");
      });
  };

  return (
    <div className="flex">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div className={`flex-1 bg-gray-100 transition-all ${isSidebarOpen ? "pl-64" : "pl-16"}`}>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FaStar className="text-yellow-500 text-4xl mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Évaluations des employés</h2>
          </div>
          
          {/* Affichage du nom de l'utilisateur connecté */}
          {user && (
            <div className="mb-6 text-lg">
              <strong>Utilisateur connecté : </strong>
              {user.firstName} {user.lastName}
            </div>
          )}

          {/* Formulaire d'ajout */}
          <form className="mb-8" onSubmit={handleAddEvaluation}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={newEvaluation.firstName}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={newEvaluation.lastName}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="date"
                name="date"
                value={newEvaluation.date}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="number"
                name="score"
                placeholder="Note (ex: 4.5)"
                step="0.1"
                value={newEvaluation.score}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="comments"
                placeholder="Commentaires"
                value={newEvaluation.comments}
                onChange={handleChange}
                className="p-3 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg"
            >
              Ajouter une évaluation
            </button>
          </form>

          {/* Table des évaluations */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Année</th>
                <th className="px-6 py-3">Note</th>
                <th className="px-6 py-3">Commentaires</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">
                    {evaluation.firstName} {evaluation.lastName}
                  </td>
                  <td className="px-6 py-4">{new Date(evaluation.date).getFullYear()}</td>
                  <td className="px-6 py-4">{evaluation.score} / 5</td>
                  <td className="px-6 py-4">{evaluation.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Evaluations;
