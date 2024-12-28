import React from "react";
import { FaStar } from "react-icons/fa"; // Importation de l'icône étoile

const PerformanceEvaluation = () => {
    // Exemple de données d'évaluations
    const evaluations = [
        {
            year: 2024,
            rating: "Excellent",
            color: "bg-green-500", // Couleur pour 'Excellent'
        },
        {
            year: 2023,
            rating: "Très Bon",
            color: "bg-yellow-500", // Couleur pour 'Très Bon'
        },
        {
            year: 2022,
            rating: "Bon",
            color: "bg-blue-500", // Couleur pour 'Bon'
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Évaluations de Performance</h2>
            
            {/* Affichage des évaluations */}
            <div className="space-y-6">
                {evaluations.map((evaluation, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className={`w-10 h-10 ${evaluation.color} text-white rounded-full flex items-center justify-center`}>
                            <FaStar size={20} />
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-gray-800">{`Évaluation de ${evaluation.year}`}</p>
                            <p className="text-lg text-gray-600">{evaluation.rating}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerformanceEvaluation;
