import React from "react";
import Header from "../Header/Header";
import AdminSidebar from "../SidebarAdmin/AdminSidebar";
import Cards from "../Cards/Cards"; 
import CustomBarChart from "../Charts/CustomBarChart";
import CustomPieChart from "../Charts/CustomPieChart"; 

const MainContent = ({ isOpen, darkMode, toggleDarkMode, toggleSidebar }) => {
    return (
        <div className={`flex font-Montserrat ${darkMode ? "dark" : ""} bg-slate-700`}>
            <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 bg-slate-200 ${isOpen ? "md:ml-44" : "ml-16"} transition-all duration-300 dark:bg-slate-800`}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Cards />
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex justify-between">
                        <div className="w-1/2">
                            <h2 className={`text-lg font-bold ${darkMode ? "text-pink-300" : "text-red-500"}`}>
                                Graphique des performances
                            </h2>
                            <CustomBarChart />
                        </div>
                        <div className="w-1/2">
                            <h2 className={`text-lg font-bold ${darkMode ? "text-pink-300" : "text-red-500"}`}>
                                Répartition des employés
                            </h2>
                            <CustomPieChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
