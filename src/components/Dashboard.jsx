// src/components/Dashboard.jsx
import React from 'react';
import TimetableTester from './TimetableTester';
import FacultyDashboard from './FacultyDashboard';
import StudentDashboard from './StudentDashboard';
import DashboardHeader from './DashboardHeader';

const Dashboard = ({ user, onLogout }) => {
  // If the user data is still loading, show a message
  if (!user) {
    return <div>Loading user data...</div>;
  }

  // Render the correct dashboard based on the user's role
  switch (user.role) {
    case 'admin':
      return <TimetableTester user={user} onLogout={onLogout} />;
    case 'faculty':
      return <FacultyDashboard user={user} onLogout={onLogout} />;
    case 'student':
      return <StudentDashboard user={user} onLogout={onLogout} />;
    default:
      // Optional: A fallback for unknown roles or a general user dashboard
      return <div>Invalid user role. Please contact support.</div>;
  }
};

export default Dashboard;