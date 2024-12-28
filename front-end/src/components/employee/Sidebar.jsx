import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importer useNavigate pour la redirection

const Sidebar = ({ setActiveTab }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const navigate = useNavigate();  // Initialiser navigate pour la redirection

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleLogout = () => {
        // Supprimer le token d'authentification (si utilisé dans localStorage)
        localStorage.removeItem("authToken");

        // Rediriger l'utilisateur vers la page de connexion
        navigate("/login");
    };

    return (
        <div className="flex">
            {/* Bouton pour basculer l'affichage de la sidebar */}
            <button
                onClick={toggleSidebar}
                className="p-2 bg-purple-700 text-white rounded-full fixed top-4 left-4 z-20 shadow-md hover:bg-purple-600 transition duration-300"
            >
                {isSidebarVisible ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                )}
            </button>

            {/* Sidebar */}
            <div
                className={`${
                    isSidebarVisible ? "w-64" : "w-0"
                } bg-gray-900 text-white h-screen shadow-lg transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}
            >
                <h2 className="text-2xl font-bold p-6 border-b border-gray-700 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 10h11M9 21V3M17 16l4-4m0 0l-4-4m4 4H9"
                        />
                    </svg>
                    Essence RH
                </h2>
                <ul className="flex-grow px-4 space-y-4">
                    <li>
                        <button
                            onClick={() => setActiveTab("personalInfo")}
                            className="w-full text-left flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 mr-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11c.866 0 1.67-.24 2.35-.653M12 20v-4m0 4H9m3 0h3m-3-9V3m0 8a4 4 0 110-8 4 4 0 010 8zm7 6.09c0-1.562-3.69-2.91-7-2.91s-7 1.348-7 2.91C5 17.642 8.69 19 12 19s7-1.358 7-2.91z"
                                />
                            </svg>
                            Informations Personnelles
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab("leaveRequests")}
                            className="w-full text-left flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 mr-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 20V10m9-4H3m6 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6"
                                />
                            </svg>
                            Demandes des Congés
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab("performance")}
                            className="w-full text-left flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 mr-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 12h2m-1-1v6m0-6a4 4 0 100-8 4 4 0 000 8zm2 10h5a2 2 0 002-2v-2a9 9 0 10-18 0v2a2 2 0 002 2h5"
                                />
                            </svg>
                            Évaluations de Performance
                        </button>
                    </li>
                </ul>
                <div className="px-4 mb-6">
                    <button
                        onClick={handleLogout} // Appeler handleLogout à la déconnexion
                        className="w-full text-left flex items-center p-3 rounded-lg bg-red-600 hover:bg-red-500 text-white transition duration-300 shadow-md"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 mr-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V7m0 10h-1.5m1.5-9H7"
                            />
                        </svg>
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
