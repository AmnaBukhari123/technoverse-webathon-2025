const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get issues
export const getIssues = async () => {
  const res = await fetch(`${API_URL}/issues`);
  if (!res.ok) throw new Error('Failed to fetch issues');
  return res.json();
};

// Report issue
export const reportIssue = async (formData) => {
  const res = await fetch(`${API_URL}/issues`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to report issue');
  return res.json();
};
