import React, { useState } from 'react';
import Sidebar from '../components/d_Sidebar';
import './Reports.css';

const Reports = () => {
  // State for reports to enable future updates
  const [reports, setReports] = useState([
    { id: 1, name: 'Transport Department Report', status: 'Completed' },
    { id: 2, name: 'Sanitation Department Report', status: 'Pending Review' },
    { id: 3, name: 'Health Department Report', status: 'Submitted' }
  ]);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content" style={{ marginLeft: '260px' }}>
        <h1 className="page-title">Department Reports</h1>

        {/* Report Section */}
        <div className="report-section">
          <h2>Manage Department-Specific Reports</h2>
          <p>Upload reports, update project statuses, and manage resources for your department.</p>
          
          {/* Report List */}
          <div className="report-list">
            {reports.map((report) => (
              <div key={report.id} className="report-item">
                <h3>{report.name}</h3>
                <p>Status: {report.status}</p>
              </div>
            ))}
          </div>

          {/* Upload Report Button */}
          <button className="upload-btn">Upload New Report</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
