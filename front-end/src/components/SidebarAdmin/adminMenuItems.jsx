import React from 'react';

const MenuItem = ({ icon: Icon, name, isOpen, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className="text-white hover:bg-gray-700 p-2 flex items-center w-full justify-start"
        >
            <Icon className="mr-2" /> {/* Remplacer <icon /> par <Icon /> pour utiliser le composant d'icône */}
            {isOpen && <span>{name}</span>}
        </button>
    );
};

export default MenuItem;
