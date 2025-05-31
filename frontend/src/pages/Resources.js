import React, { useState } from 'react';
import Sidebar from '../components/d_Sidebar';
import './Resources.css';

const initialResources = [
  { id: 1, name: 'Excavators', quantity: 5, status: 'Available' },
  { id: 2, name: 'Trucks', quantity: 10, status: 'In Use' },
  { id: 3, name: 'Field Workers', quantity: 30, status: 'Available' },
];

const Resources = () => {
  const [resources, setResources] = useState(initialResources);
  const [selectedResource, setSelectedResource] = useState(null);
  const [status, setStatus] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
    setStatus(resource.status);
    setQuantity(resource.quantity);
  };

  const handleResourceUpdate = () => {
    const updatedResource = { ...selectedResource, status, quantity: parseInt(quantity) };

    const updatedResources = resources.map((res) =>
      res.id === updatedResource.id ? updatedResource : res
    );

    setResources(updatedResources);
    setSelectedResource(null);
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content" style={{ marginLeft: '260px' }}>
        <h1 className="page-title">Resource Management</h1>

        <div className="resource-section">
          <h2>Manage Resources</h2>

          {/* Resource List */}
          <div className="resource-list">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className={`resource-item ${selectedResource?.id === resource.id ? 'selected' : ''}`}
                onClick={() => handleResourceSelect(resource)}
              >
                <h3>{resource.name}</h3>
                <p>Quantity: {resource.quantity}</p>
                <p>Status: {resource.status}</p>
              </div>
            ))}
          </div>

          {/* Update Form */}
          {selectedResource && (
            <div className="resource-details">
              <h3>Update Resource</h3>

              <div className="input-group">
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>

              <div className="input-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <button className="update-btn" onClick={handleResourceUpdate}>
                Update Resource
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
