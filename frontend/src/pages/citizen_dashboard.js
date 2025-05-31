import React, { useState } from "react";
import "./citizen_dashboard.css";
import logo from "../assets/logo.png";




import {
  FaBell,
  FaUserCircle,
  FaHome,
  FaMapMarkerAlt,
  FaInbox,
  FaCog,
  FaPoll,
  FaLocationArrow
} from "react-icons/fa";

import ReportIssueForm from "../components/ReportIssueForm";
import VotingScreen from "../components/VotingScreen";
import TrafficMap from "../components/TrafficMap";

const DashboardScreen = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          
          <h2>UrbanSync</h2>
        </div>
        <nav className="sidebar-menu">
          <a
            href="#"
            className="menu-item"
            onClick={() => setActiveSection("dashboard")}
          >
            <FaHome /> Dashboard
          </a>
          <a
            href="#"
            className="menu-item"
            onClick={() => setActiveSection("report")}
          >
            <FaMapMarkerAlt /> Report Issue
          </a>
          <a
            href="#"
            className="menu-item"
            onClick={() => setActiveSection("issues")}
          >
            <FaInbox /> Track My Issues
          </a>
          <a
            href="#"
            className="menu-item"
            onClick={() => setActiveSection("voting")}
          >
            <FaPoll /> Voting
          </a>
          <a
            href="#"
            className="menu-item"
            onClick={() => setActiveSection("messages")}
          >
            <FaLocationArrow /> View City Map
          </a>
          {/* <a href="#" className="menu-item" onClick={() => setActiveSection("settings")}><FaCog /> Settings</a> */}
        </nav>
      </aside>

      {/* Main Area */}
      <main className="main-area">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-right">
            <FaBell className="icon" />
            <FaUserCircle className="icon" />
          </div>
        </header>

        {/* Dynamic Main Content */}
        <section className="main-content">
          {activeSection === "dashboard" && (
            <>
              <h1 className="dashboard-title">Welcome to UrbanSync </h1>
              <p className="dashboard-subtitle">
                This is your central dashboard for interacting with smart city
                services.
              </p>
              <div className="dashboard-widgets-row">
  <div className="dashboard-widget">
    <div className="widget-icon">📝</div>
    <div className="widget-info">
      <h2>New Issues</h2>
      <p>4</p>
    </div>
  </div>
  <div className="dashboard-widget">
    <div className="widget-icon">✅</div>
    <div className="widget-info">
      <h2>Resolved</h2>
      <p>22</p>
    </div>
  </div>
</div>

<div className="dashboard-widgets-row single-center">
  <div className="dashboard-widget">
    <div className="widget-icon">📊</div>
    <div className="widget-info">
      <h2>Proposals Open</h2>
      <p>3</p>
    </div>
  </div>
</div>

            </>
          )}

          {activeSection === "report" && <ReportIssueForm />}

          {activeSection === "voting" && <VotingScreen />}

          {activeSection === "issues" && (
            <p style={{ color: "#008080" }}>🛠 My Issues screen placeholder</p>
          )}

          {activeSection === "messages" && <TrafficMap />}


          {activeSection === "settings" && (
            <p style={{ color: "#008080" }}>⚙ Settings screen placeholder</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardScreen;