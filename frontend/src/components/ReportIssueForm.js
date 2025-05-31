import React, { useEffect, useState } from "react";
import { getIssues, reportIssue } from "../api"; // we'll define these in api.js
import "./ReportIssueForm.css";

const ReportIssueForm = () => {
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    location: "",
    file: null,
  });

  // Fetch issues on load
  useEffect(() => {
    getIssues().then(setIssues).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("file", formData.file);
    data.append("user_id", 1); // replace with actual logged-in user id

    try {
      const newIssue = await reportIssue(data);
      setIssues([newIssue, ...issues]); // add new issue to the top
      alert("Issue reported successfully!");
      setFormData({ category: "", description: "", location: "", file: null });
    } catch (err) {
      console.error(err);
      alert("Failed to report issue.");
    }
  };

  return (
    <div className="report-form">
      <h2>Report an Issue</h2>
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select name="category" onChange={handleChange} value={formData.category} required>
          <option value="">Select Category</option>
          <option value="pothole">Pothole</option>
          <option value="streetlight">Streetlight</option>
          <option value="garbage">Garbage</option>
          <option value="water">Water Leakage</option>
        </select>

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Describe the issue..."
          onChange={handleChange}
          value={formData.description}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="Enter location"
          onChange={handleChange}
          value={formData.location}
          required
        />

        <label>Upload Photo/Video</label>
        <input type="file" name="file" onChange={handleChange} />

        <button type="submit">Submit Issue</button>
      </form>

      <h3>Reported Issues</h3>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <strong>{issue.category}</strong>: {issue.description} - {issue.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportIssueForm;
