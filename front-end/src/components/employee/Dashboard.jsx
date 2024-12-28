import React, { useState } from "react";
import Sidebar from "./Sidebar";
import PersonalInfo from "./PersonalInfo";
import LeaveRequests from "./LeaveRequestsuser";
import PerformanceEvaluation from "./PerformanceEvaluation";
import Header from "./Header";

const Dashboard = ({ darkMode, toggleDarkMode }) => {
    const [activeTab, setActiveTab] = useState("personalInfo");

    return (
        <div className={`flex ${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}>
            <Sidebar setActiveTab={setActiveTab} />
            <div className="flex-1 p-6">
                <Header toggleDarkMode={toggleDarkMode} />
                <div className="mt-6">
                    {activeTab === "personalInfo" && <PersonalInfo />}
                    {activeTab === "leaveRequests" && <LeaveRequests />}
                    {activeTab === "performance" && <PerformanceEvaluation />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
