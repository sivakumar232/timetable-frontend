// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page components
import LandingPage from './components/LandingPage';
import AdminAuth from './components/AdminAuth';
import Dashboard from './components/Dashboard'; // The new Dashboard router
import ProtectedRoute from './components/ProtectedRoute';

const API_URL = 'http://localhost:3001';

function App() {
  // We store the entire user object, or null if not logged in
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial page load check

  // This effect runs once when the app loads to check for a token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If a token exists, fetch the user's data from the server
      fetch(`${API_URL}/api/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) {
          // If token is invalid (e.g., expired), remove it
          localStorage.removeItem('token');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data?._id) { // Check if we got valid user data
          setUser(data);
        }
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  // This function is called after a successful login/registration
  const handleLoginSuccess = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch(`${API_URL}/api/me`, {
             headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data._id) {
            setUser(data); // This updates the state with the user's data
        }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // This will cause the ProtectedRoute to redirect to /auth
  };
  
  // Display a global loading message while we check for a token
  if (loading) {
      return <div>Loading Application...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/auth" 
          element={<AdminAuth onLoginSuccess={handleLoginSuccess} />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              {/* Pass the full user object to the Dashboard */}
              <Dashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;