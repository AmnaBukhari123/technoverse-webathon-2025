import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueMonitoring.css';

const IssueMonitoring = () => {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState('');

  // Fetch all issues on component mount
  useEffect(() => {
    axios.get('/issues')
      .then((res) => setIssues(res.data))
      .catch((err) => console.error('Error fetching issues:', err));
  }, []);

  // Handle adding a new issue
  const handleAddIssue = () => {
    if (!newIssue.trim()) {
      alert('Please provide an issue title.');
      return;
    }

    axios.post('/issues', {
      title: newIssue,
      description: 'Reported via citizen portal',
      status: 'Pending'
    })
      .then((res) => {
        setIssues([...issues, res.data]);
        setNewIssue('');
      })
      .catch((err) => console.error('Error adding issue:', err));
  };

  // Handle toggling issue status
  const handleIssueStatusChange = (issueId) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;

    const newStatus = issue.status === 'Pending' ? 'Resolved' : 'Pending';

    axios.put(`/issues/${issueId}/update`, { status: newStatus })
      .then(() => {
        setIssues((prevIssues) =>
          prevIssues.map((i) =>
            i.id === issueId ? { ...i, status: newStatus } : i
          )
        );
      })
      .catch((err) => console.error('Error updating issue status:', err));
  };

  return (
    <div className="issue-monitoring">
      <h1 className="page-title">Issue Monitoring</h1>
      <div className="add-issue">
        <input
          type="text"
          placeholder="New Issue"
          value={newIssue}
          onChange={(e) => setNewIssue(e.target.value)}
        />
        <button onClick={handleAddIssue}>Add Issue</button>
      </div>
      <div className="issues-list">
        {issues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <h3>{issue.title}</h3>
            <p>Status: {issue.status}</p>
            <button onClick={() => handleIssueStatusChange(issue.id)}>
              Mark as {issue.status === 'Pending' ? 'Resolved' : 'Pending'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueMonitoring;
