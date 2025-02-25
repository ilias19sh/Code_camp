// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/users">Utilisateurs</Link>
        <Link to="/reports">Signalements</Link>
      </nav>
    </header>
  );
}

export default Header;