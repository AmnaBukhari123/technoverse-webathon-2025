
// src/pages/AdminHome.js
import React from 'react';
import './AdminHome.css';
import Sidebar from '../components/Sidebar'; // ✅ Import the sidebar
import {
  FaUsers,
  FaBug,
  FaCheckCircle,
  FaTasks,
  FaPoll,
  FaCogs,
  FaBell,
  FaChartPie
} from 'react-icons/fa';

const AdminHome = () => {
  const handleManageRoles = () => {
    alert('Redirecting to Role Management...');
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main admin content */}
      <div className="admin-home" style={{ flex: 1, padding: '20px' }}>
        <h1 className="page-title">Admin Dashboard</h1>

        <div className="quick-stats">
          <div className="stat-card">
            <FaUsers className="icon" />
            <div>
              <h2>1,024</h2>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card">
            <FaBug className="icon" />
            <div>
              <h2>312</h2>
              <p>Total Issues</p>
            </div>
          </div>
          <div className="stat-card">
            <FaCheckCircle className="icon" />
            <div>
              <h2>87%</h2>
              <p>Resolved</p>
            </div>
          </div>
          <div className="stat-card">
            <FaChartPie className="icon" />
            <div>
              <h2>23</h2>
              <p>Departments</p>
            </div>
          </div>
        </div>

        <div className="shortcuts">
          <button className="shortcut-btn" onClick={handleManageRoles}>
            <FaCogs /> Manage Roles
          </button>
          <button className="shortcut-btn">
            <FaTasks /> Assign Tasks
          </button>
          <button className="shortcut-btn">
            <FaPoll /> Manage Polls
          </button>
          <button className="shortcut-btn">
            <FaBell /> Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
