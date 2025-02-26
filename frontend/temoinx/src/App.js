import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Header from './components/header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
        <ThemeToggle />
        <Footer />
      </div>
    </Router>
  );
}

export default App;