import React, { useState } from 'react';
import './AnalyticsReports.css';

const AnalyticsReports = () => {
  // Removed 'setReports' as we're not modifying the state here
  const reports = [
    { id: 1, title: 'System Usage', value: '85%' },
    { id: 2, title: 'Task Completion Rate', value: '75%' },
    { id: 3, title: 'Active Users', value: '120' },
  ];

  return (
    <div className="analytics-reports">
      <h1 className="page-title">Analytics & Reports</h1>

      <div className="reports">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            <h3>{report.title}</h3>
            <p>{report.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsReports;
