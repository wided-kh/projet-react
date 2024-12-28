import React from "react";

const Header = ({ toggleDarkMode }) => (
    <div className="flex justify-end items-center mb-6 p-4 bg-gray-100 shadow-md dark:bg-gray-900 dark:shadow-lg">
        <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition transform hover:scale-105 shadow-lg"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.66-12.34l-.7.7M6.34 17.66l-.7.7M21 12h-1m-16 0H3m12.34 6.34l-.7-.7M6.34 6.34l-.7-.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>
           
        </button>
    </div>
);

export default Header;
