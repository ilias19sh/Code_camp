import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Header from './components/header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Login from './pages/Login';
import './styles.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <>
      <Header />
      {children}
      <ThemeToggle />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
           // <ProtectedRoute>
              <Home />
            //</ProtectedRoute>
          } />
          
          <Route path="/users" element={
           // <ProtectedRoute>
              <Users />
            //</ProtectedRoute>
          } />
          
          <Route path="/reports" element={
           // <ProtectedRoute>
              <Reports />
            //</ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;