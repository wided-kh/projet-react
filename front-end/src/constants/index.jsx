import { FaTachometerAlt, FaUsers, FaClipboardCheck, FaHistory, FaStar, FaCheckSquare, FaClock, FaBell, FaSignOutAlt } from "react-icons/fa";
import {  FaCalendarCheck,  FaChartLine } from "react-icons/fa";
  

  
  // Menu Items pour l'administrateur RH
export const adminMenuItems = [
  {
      icon: FaTachometerAlt, // Icône pour le tableau de bord
      name: "Tableau de bord", // Changement de texte
      isOpen: true,
      route: "/main",
  },
  {
    icon: FaUsers,
    name: "Employés",
    isOpen: true,
    route: "/employees", // Route vers la page des employés
},
  {
      icon: FaClipboardCheck,
      name: "Congés en attente",
      isOpen: true,
      route: "/conges-en-attente",
  },
  {
      icon: FaHistory,
      name: "Tous les congés",
      isOpen: true,
      route: "/liste-congé",
  },
  {
      icon: FaStar,
      name: "Évaluations",
      isOpen: true,
      route: "/evaluations" 
  },
  {
      icon: FaCheckSquare,
      name: "Validation des heures",
      isOpen: true,
      route:"/ValidationHeures",
  },
  
  
  {
      icon: FaBell,
      name: "Gestion des notifications",
      isOpen: true,
      route:"/GestionNotifications",
  },
  {
      icon: FaSignOutAlt, // Changement d'icône pour la déconnexion
      name: "Déconnexion", // Changement de texte
      isOpen: true,
      isLogout: true, // Ajout d'une propriété pour gérer la déconnexion
  },
];
  // Card Items
export const cardItems = [
  {
    title: "Total des Employés",
    value: "150",
    icon: (
      <FaUsers className="rounded-full bg-blue-500 p-2 text-4xl text-white" />
    ),
  },
  {
    title: "Congés Pris",
    value: "320 Jours",
    icon: (
      <FaCalendarCheck className="rounded-full bg-green-500 p-2 text-4xl text-white" />
    ),
  },
  {
    title: "Heures Travaillées",
    value: "1200 Heures",
    icon: (
      <FaClock className="rounded-full bg-yellow-500 p-2 text-4xl text-white" />
    ),
  },
  {
    title: "Performance Moyenne",
    value: "85%",
    icon: (
      <FaChartLine className="rounded-full bg-red-500 p-2 text-4xl text-white" />
    ),
  },
];
