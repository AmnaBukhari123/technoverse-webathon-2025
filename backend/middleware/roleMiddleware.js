const pool = require('../config/db');

const checkRole = (roles) => {
  return (req, res, next) => {
    // Ensure case-insensitive comparison for roles
    const userRole = req.user.role.toLowerCase();
    const lowerRoles = roles.map(r => r.toLowerCase());

    if (!lowerRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};

const roleMiddleware = (requiredPermissions) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    try {
      // Get user role
      const { rows: userRows } = await pool.query(
        `SELECT role_id FROM users WHERE id = $1`, [userId]
      );

      if (!userRows.length) {
        return res.status(403).json({ message: 'User not found' });
      }

      const roleId = userRows[0].role_id;

      // Get permissions for this role
      const { rows: permRows } = await pool.query(`
        SELECT p.name FROM role_permissions rp
        JOIN permissions p ON rp.permission_id = p.id
        WHERE rp.role_id = $1
      `, [roleId]);

      const userPermissions = permRows.map(p => p.name.toLowerCase());
      const requiredLowerPerms = requiredPermissions.map(p => p.toLowerCase());

      // Check if all required permissions are in userPermissions
      const hasPermission = requiredLowerPerms.every(rp => userPermissions.includes(rp));

      if (!hasPermission) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      next();
    } catch (err) {
      console.error('RoleMiddleware Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = {
  checkRole,
  roleMiddleware
};
