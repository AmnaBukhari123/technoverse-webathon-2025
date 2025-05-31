import React, { useState } from 'react';
import './RolePermissions.css';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';

// Predefined roles and permissions
const permissionsList = [
  'Manage Users',
  'Assign Tasks',
  'Manage Polls',
  'View Dashboard',
  'Update Profile',
  'View Reports',
];

const RolePermissions = ({ users, setUsers }) => {
  const [roles, setRoles] = useState([
    { id: 1, role: 'Admin', permissions: ['Manage Users', 'Assign Tasks', 'Manage Polls'] },
    { id: 2, role: 'User', permissions: ['View Dashboard', 'Update Profile'] },
  ]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle role change
  const handleRoleChange = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    setSelectedRole(role);
    setSelectedPermissions(role.permissions);
  };

  // Toggle permissions
  const handlePermissionToggle = (permission) => {
    setSelectedPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  // Save role permission changes
  const handleSave = () => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === selectedRole.id ? { ...role, permissions: selectedPermissions } : role
      )
    );
    setSelectedRole(null);
    setSelectedPermissions([]);
  };

  // Add new role
  const handleAddRole = () => {
    const newRole = { id: roles.length + 1, role: newRoleName, permissions: [] };
    setRoles([...roles, newRole]);
    setNewRoleName('');
  };

  // Delete role
  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
    setSelectedRole(null);
    setSelectedPermissions([]);
  };

  // Assign role to user
  const handleAssignRole = (userId, roleId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: roles.find((role) => role.id === roleId).role } : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  return (
    <div className="role-permissions">
      <h1 className="page-title">Role & Permissions</h1>

      {/* Add New Role Section */}
      <div className="add-role">
        <input
          type="text"
          placeholder="New Role Name"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
        />
        <button className="add-role-btn" onClick={handleAddRole}><FaPlusCircle /> Add Role</button>
      </div>

      {/* Existing Roles List */}
      <div className="roles-list">
        <h2>Existing Roles</h2>
        <ul>
          {roles.map((role) => (
            <li key={role.id}>
              <span onClick={() => handleRoleChange(role.id)}>{role.role}</span>
              <button onClick={() => handleDeleteRole(role.id)}><FaTrash /></button>
            </li>
          ))}
        </ul>
      </div>

      {/* Permissions Panel - Shown when a role is selected */}
      {selectedRole && (
        <div className="permissions-panel">
          <h2>Edit {selectedRole.role} Permissions</h2>

          {/* Permissions List */}
          <div className="permissions-list">
            {permissionsList.map((permission, index) => (
              <div key={index} className="permission-item">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission)}
                  onChange={() => handlePermissionToggle(permission)}
                />
                <label>{permission}</label>
              </div>
            ))}
          </div>

          {/* Save/Cancel Buttons */}
          <div className="buttons">
            <button onClick={handleSave} className="save-btn">Save Changes</button>
            <button onClick={() => setSelectedRole(null)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      {/* Assign Role to User */}
      {selectedUser && (
        <div className="assign-role-panel">
          <h2>Assign Role to {selectedUser.name}</h2>
          <div className="roles-list">
            {roles.map((role) => (
              <div key={role.id}>
                <button onClick={() => handleAssignRole(selectedUser.id, role.id)}>{role.role}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermissions;
