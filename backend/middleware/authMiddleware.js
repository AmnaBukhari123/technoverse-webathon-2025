const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user role from the DB
    const { rows } = await pool.query('SELECT id, role_id FROM users WHERE id = $1', [decoded.id]);

    if (!rows.length) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = rows[0];

    // Fetch role name and normalize it to lowercase
    const { rows: roleRows } = await pool.query('SELECT name FROM roles WHERE id = $1', [user.role_id]);
    const roleName = roleRows[0] ? roleRows[0].name.toLowerCase() : 'unknown';

    req.user = {
      id: user.id,
      role: roleName
    };

    console.log('🔑 Authenticated user:', req.user);
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = { verifyToken };
