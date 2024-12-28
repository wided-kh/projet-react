import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import MainContent from "./components/Main/Main";
import EmployeeList from './components/EmployeeList/EmployeeList';
import LeaveRequests from './components/LeaveRequests/LeaveRequests';
import LeaveList from './components/LeaveList/LeaveList';
import Evaluations from "./components/Evaluations/Evaluations";
import ValidationHeures from "./components/ValidationHeures/ValidationHeures";
import GestionNotifications from "./components/GestionNotifications/GestionNotifications";
import Dashboard from "./components/employee/Dashboard";

const App = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(""); // Rôle de l'utilisateur
    const [isOpen, setIsOpen] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role) {
            setIsAuthenticated(true);
            setUserRole(role);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setUserRole(""); // Réinitialiser le rôle
    };

    return (
        <Router>
            <div>
                <Routes>
                    {/* Si l'utilisateur est déjà connecté, rediriger vers son dashboard */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                userRole === "admin" ? (
                                    <Navigate to="/main" />
                                ) : (
                                    <Navigate to="/user-dashboard" />
                                )
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    {/* Route de connexion et d'inscription */}
                    <Route path="/login" element={<LoginRegister setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
                    <Route path="/register" element={<LoginRegister setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />

                    {/* Route pour l'interface admin */}
                    <Route
                        path="/main"
                        element={
                            isAuthenticated && userRole === "admin" ? (
                                <MainContent
                                    isOpen={isOpen}
                                    darkMode={darkMode}
                                    toggleDarkMode={toggleDarkMode}
                                    toggleSidebar={toggleSidebar}
                                    handleLogout={handleLogout}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    {/* Autres routes protégées pour l'admin */}
                    <Route path="/employees" element={
                        isAuthenticated && userRole === "admin" ? (
                            <EmployeeList />
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />
                    <Route path="/conges-en-attente" element={
                        isAuthenticated && userRole === "admin" ? (
                            <LeaveRequests />
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />
                    <Route path="/liste-congé" element={
                        isAuthenticated && userRole === "admin" ? (
                            <LeaveList />
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />
                    <Route path="/evaluations" element={
                        isAuthenticated && userRole === "admin" ? (
                            <Evaluations />
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />
                    <Route path="/ValidationHeures" element={
                        isAuthenticated && userRole === "admin" ? (
                            <ValidationHeures />
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />
                    <Route path="/GestionNotifications" element={
                        isAuthenticated && userRole === "admin" ? (
                            <GestionNotifications />
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />

                    {/* Dashboard pour l'utilisateur */}
                    <Route
                        path="/user-dashboard"
                        element={
                            isAuthenticated && userRole === "user" ? (
                                <Dashboard
                                    darkMode={darkMode}
                                    toggleDarkMode={toggleDarkMode}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
