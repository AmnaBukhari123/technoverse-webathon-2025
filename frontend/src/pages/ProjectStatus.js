import React, { useState } from 'react';
import Sidebar from '../components/d_Sidebar';
import './ProjectStatus.css';

const initialProjects = [
  { id: 1, title: 'Road Repair in Sector 5', status: 'In Progress', dueDate: '2025-06-15' },
  { id: 2, title: 'Water Pipeline Replacement', status: 'Pending', dueDate: '2025-08-01' },
  { id: 3, title: 'Sanitation Drive - Sector 8', status: 'Completed', dueDate: '2025-05-20' },
];

const Project = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState(null);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setStatus(project.status);
    setDueDate(project.dueDate);
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProjectUpdate = () => {
    const updatedProject = { ...selectedProject, status, dueDate, file };

    const updatedProjects = projects.map((proj) =>
      proj.id === updatedProject.id ? updatedProject : proj
    );

    setProjects(updatedProjects);
    setSelectedProject(null); // Deselect after update
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content" style={{ marginLeft: '260px' }}>
        <h1 className="page-title">Project Status Management</h1>

        <div className="project-section">
          <h2>Manage Projects</h2>

          {/* Project List */}
          <div className="project-list">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`project-item ${selectedProject?.id === project.id ? 'selected' : ''}`}
                onClick={() => handleProjectSelect(project)}
              >
                <h3>{project.title}</h3>
                <p>Status: {project.status}</p>
                <p>Due Date: {project.dueDate}</p>
              </div>
            ))}
          </div>

          {/* Project Update Form */}
          {selectedProject && (
            <div className="project-details">
              <h3>Update Project</h3>

              <div className="input-group">
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="input-group">
                <label>Due Date:</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Upload Report:</label>
                <input type="file" onChange={handleFileUpload} />
              </div>

              <button className="update-btn" onClick={handleProjectUpdate}>
                Update Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
