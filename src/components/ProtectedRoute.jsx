// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    // If user is not logged in, redirect them to the /auth page
    return <Navigate to="/auth" replace />;
  }

  
  // If user is logged in, show the component they are trying to access
  return children;
}

export default ProtectedRoute;