// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Styling the home page


const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Your Department Dashboard</h1>

      <div className="overview">
        <p>Here you can manage your department's tasks, track progress, and access essential tools:</p>
        
        <div className="action-cards">
          {/* Manage Department-Specific Data */}
          <div className="card">
            <h3>Manage Department-Specific Data</h3>
            <p>Upload reports, update project statuses, and manage resources.</p>
            <Link to="/reports" className="btn">Go to Reports</Link>
          </div>

          {/* Communicate with Other Departments and Admin */}
          <div className="card">
            <h3>Communicate with Other Departments</h3>
            <p>Use the internal chat system to coordinate and share information.</p>
            <Link to="/internal-chat" className="btn">Open Chat</Link>
          </div>

          {/* Issue Management */}
          <div className="card">
            <h3>Issue Management</h3>
            <p>View, assign, and track issues reported by citizens.</p>
            <Link to="/issue-management" className="btn">Go to Issues</Link>
          </div>

          {/* AR Field Assistance */}
          <div className="card">
            <h3>AR Field Assistance</h3>
            <p>Use AR to view real-time data overlays in the field.</p>
            <Link to="/ar-field-assistance" className="btn">Open AR Assistance</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
