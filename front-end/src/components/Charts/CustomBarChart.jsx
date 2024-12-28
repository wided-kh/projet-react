import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Exemple de données
const data = [
    { name: "Jan", employés: 150, congés: 30, heures: 120, performance: 85 },
    { name: "Fév", employés: 200, congés: 45, heures: 100, performance: 80 },
    { name: "Mar", employés: 170, congés: 20, heures: 110, performance: 90 },
    { name: "Avr", employés: 220, congés: 50, heures: 130, performance: 75 },
];

const CustomBarChart = () => {
    return (
        <div className="h-80">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="employés" fill="#8884d8" />
                    <Bar dataKey="congés" fill="#82ca9d" />
                    <Bar dataKey="heures" fill="#ffc658" />
                    <Bar dataKey="performance" fill="#ff7300" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
