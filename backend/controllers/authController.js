const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // direct DB access since no ORM

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password, username, department_id, role_id } = req.body;

    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (username, email, password, department_id, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username, department_id, role_id',
      [username, email, hash, department_id, role_id]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userResult = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Get the role name
    const roleResult = await pool.query('SELECT name FROM roles WHERE id=$1', [user.role_id]);
    const roleName = roleResult.rows[0]?.name || 'unknown';

    // Generate JWT with role name
    const token = jwt.sign(
      { id: user.id, role: roleName, department_id: user.department_id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const userResult = await pool.query(
      'SELECT id, username, email, role_id, department_id, is_active FROM users WHERE id=$1',
      [id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userResult.rows[0]);
  } catch (err) {
    console.error('Get User Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, username, department_id, role_id } = req.body;

    let hash;
    if (password) {
      hash = await bcrypt.hash(password, 10);
    }

    const userResult = await pool.query(
      `UPDATE users SET 
        email = COALESCE($1, email),
        password = COALESCE($2, password),
        username = COALESCE($3, username),
        department_id = COALESCE($4, department_id),
        role_id = COALESCE($5, role_id)
       WHERE id=$6
       RETURNING id, username, email, department_id, role_id`,
      [email, hash, username, department_id, role_id, id]
    );

    res.json({ message: 'User updated', user: userResult.rows[0] });
  } catch (err) {
    console.error('Update User Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Delete User Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
