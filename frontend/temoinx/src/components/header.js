// Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">TémoinX</span>
          </Link>
          
          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Accueil
            </Link>
            <Link to="/reports" className={`nav-link ${isActive('/reports') ? 'active' : ''}`}>
              Signalements
            </Link>
            <Link to="/users" className={`nav-link ${isActive('/users') ? 'active' : ''}`}>
              Utilisateurs
            </Link>
            <Link to="/analytics" className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}>
              Statistiques
            </Link>
          </nav>
          
          <div>
            <button className="btn btn-primary">
              Nouveau signalement
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;