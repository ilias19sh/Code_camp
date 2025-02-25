import React from 'react';
import Header from './components/header';
import Home from './components/home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
    return (
        <div>
            <Header />
            <main>
                <Home />
                <About />
                <Contact />
            </main>
        </div>
    );
}

export default App;
