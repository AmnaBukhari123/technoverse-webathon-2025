import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/d_Sidebar';
import './IssueManagement.css';

const IssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  // Fetch all issues on component mount
  useEffect(() => {
    axios.get('/api/issues') // updated to use /api/issues
      .then((res) => setIssues(res.data))
      .catch((err) => console.error('Error fetching issues:', err));
  }, []);

  // Handle issue selection
  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setStatus(issue.status);
    setAssignedTo(issue.assigned_to || ''); // note: using assigned_to from DB
  };

  // Handle status and assignment update
  const handleStatusUpdate = () => {
    if (!selectedIssue) return;

    // Update assignment separately
    axios.put(`/api/issues/${selectedIssue.id}/assign`, {
      workerId: assignedTo, // assuming assignedTo is worker's id or name
    })
    .catch((err) => console.error('Error assigning issue:', err));

    // Update status & comments
    axios.put(`/api/issues/${selectedIssue.id}/update`, {
      status,
      comments: 'Updated by department official'
    })
    .then(() => {
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.id === selectedIssue.id
            ? { ...issue, status, assigned_to: assignedTo }
            : issue
        )
      );
      setSelectedIssue(null);
    })
    .catch((err) => console.error('Error updating issue:', err));
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content" style={{ marginLeft: '260px' }}>
        <h1 className="page-title">Issue Management</h1>
        <div className="issue-section">
          <h2>Manage Reported Issues</h2>
          <p>View, assign, and update the status of issues reported by citizens.</p>
          <div className="issue-list">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`issue-item ${selectedIssue?.id === issue.id ? 'selected' : ''}`}
                onClick={() => handleIssueSelect(issue)}
              >
                <h3>{issue.category}</h3>
                <p>Description: {issue.description}</p>
                <p>Status: {issue.status}</p>
                <p>Assigned To: {issue.assigned_to || 'Unassigned'}</p>
              </div>
            ))}
          </div>
          {selectedIssue && (
            <div className="issue-details">
              <h3>Update Issue</h3>
              <div className="input-group">
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
              <div className="input-group">
                <label>Assign To:</label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Enter field worker's ID or name"
                />
              </div>
              <button className="update-btn" onClick={handleStatusUpdate}>
                Update Issue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueManagement;
