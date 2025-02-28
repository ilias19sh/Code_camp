// Header.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const Deconexion = () => {
    localStorage.setItem('isAuthenticated', false);
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          <Link to="/" className="flex items-center space-x-2 z-20">
            <span className="text-xl font-bold text-blue-600">SpotIt</span>
          </Link>


          <button
            className="lg:hidden z-20 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-600 my-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
          
          {/* Navigation pour desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`nav-link text-gray-600 hover:text-blue-600 ${isActive('/') ? 'text-blue-600 font-semibold' : ''}`}
            >
              Accueil
            </Link>
            <Link 
              to="/reports" 
              className={`nav-link text-gray-600 hover:text-blue-600 ${isActive('/reports') ? 'text-blue-600 font-semibold' : ''}`}
            >
              Signalements
            </Link>
            <Link 
              to="/analytics" 
              className={`nav-link text-gray-600 hover:text-blue-600 ${isActive('/analytics') ? 'text-blue-600 font-semibold' : ''}`}
            >
              Statistiques
            </Link>
          </nav>
          
          {/* Boutons pour desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/reports/new"
              className="btn bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Nouveau signalement
            </Link>
            <button onClick={Deconexion} className="btn btn-danger transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 ml-4">
              Se déconnecter 
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;