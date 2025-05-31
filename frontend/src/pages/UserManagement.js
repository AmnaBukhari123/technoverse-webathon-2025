import React, { useState } from 'react';
import './UserManagement.css';
import { FaEdit, FaTrash, FaUserSlash, FaPlus } from 'react-icons/fa';

const sampleUsers = [
  { id: 1, name: 'Alice Johnson', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', role: 'Manager', status: 'Active' },
  { id: 3, name: 'Charlie Lee', role: 'Citizen', status: 'Inactive' },
  { id: 4, name: 'Dana Scott', role: 'Analyst', status: 'Active' }
];

const UserManagement = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', role: '', status: 'Active' });
  const [currentUser, setCurrentUser] = useState(null);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleDeactivate = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: 'Inactive' } : user
    ));
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setNewUser({ ...user });  // Pre-fill the form with user data
  };

  const handleSaveEdit = () => {
    setUsers(users.map(user =>
      user.id === currentUser.id ? { ...user, ...newUser } : user
    ));
    setIsEditing(false);
    setCurrentUser(null);
  };

  const handleCreateUser = () => {
    const newId = users.length + 1;
    setUsers([...users, { ...newUser, id: newId }]);
    setNewUser({ name: '', role: '', status: 'Active' });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-management">
      <h1 className="page-title">User Management</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search users by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="action-btn create" onClick={() => setIsEditing(false)}>
          <FaPlus /> Create User
        </button>
      </div>

      {isEditing && (
        <div className="edit-form">
          <h3>{currentUser ? 'Edit User' : 'Create New User'}</h3>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
          <select
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button onClick={currentUser ? handleSaveEdit : handleCreateUser}>
            {currentUser ? 'Save Changes' : 'Create User'}
          </button>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button className="action-btn edit" onClick={() => handleEdit(user)}>
                  <FaEdit />
                </button>
                <button className="action-btn delete" onClick={() => handleDelete(user.id)}>
                  <FaTrash />
                </button>
                {user.status === 'Active' && (
                  <button className="action-btn deactivate" onClick={() => handleDeactivate(user.id)}>
                    <FaUserSlash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
