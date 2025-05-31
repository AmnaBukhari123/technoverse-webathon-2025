// backend/models/userModel.js
const pool = require('../config/db');

// Fetch user by email
exports.getUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

// Create new user
exports.createUser = async (email, hashedPassword) => {
  const result = await pool.query(
    `INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING id, email`,
    [email, hashedPassword]
  );
  return result.rows[0];
};

// Get user by ID
exports.getUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, email, username, role_id, department_id, is_active FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Update user (email & password)
exports.updateUser = async (id, email, hashedPassword) => {
  let query = 'UPDATE users SET ';
  const fields = [];
  const values = [];
  let index = 1;

  if (email) {
    fields.push(`email = $${index++}`);
    values.push(email);
  }
  if (hashedPassword) {
    fields.push(`password = $${index++}`);
    values.push(hashedPassword);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  query += fields.join(', ') + ` WHERE id = $${index} RETURNING id, email, username, role_id, department_id, is_active`;
  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete user
exports.deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

// Optionally: list all users (admin-level feature)
exports.getAllUsers = async () => {
  const result = await pool.query(
    'SELECT id, email, username, role_id, department_id, is_active FROM users'
  );
  return result.rows;
};
