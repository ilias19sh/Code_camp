import React from 'react';

function Header() {
    return (
        <header className="bg-green-500 text-white p-4 text-center">
            <h1 className="text-2xl">Bienvenue sur TemoinsX</h1>
            <nav>
                <ul className="flex justify-center space-x-4">
                    <li><a href="#home" className="hover:underline">Accueil</a></li>
                    <li><a href="#about" className="hover:underline">À propos</a></li>
                    <li><a href="#contact" className="hover:underline">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;