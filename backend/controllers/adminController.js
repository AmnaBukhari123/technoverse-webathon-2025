const pool = require('../config/db');

// ✅ Get all users with role names
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.username, u.email, r.name, u.is_active, u.department_id
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Update user role
const updateUserRole = async (req, res) => {
  const { userId, newRoleId } = req.body;

  try {
    await pool.query('UPDATE users SET role_id=$1 WHERE id=$2', [newRoleId, userId]);
    res.json({ message: 'User role updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Deactivate user
const deactivateUser = async (req, res) => {
  const { userId } = req.body;

  try {
    await pool.query('UPDATE users SET is_active=false WHERE id=$1', [userId]);
    res.json({ message: 'User deactivated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Dashboard KPIs
const getDashboardStats = async (req, res) => {
  try {
    const issueCounts = await pool.query('SELECT status, COUNT(*) FROM issues GROUP BY status');
    const avgResolution = await pool.query(`
      SELECT AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/3600) AS avg_hours
      FROM issues WHERE status='Resolved'
    `);

    res.json({
      issueCounts: issueCounts.rows,
      avgResolutionTimeHours: avgResolution.rows[0].avg_hours
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Department performance
const getDepartmentStats = async (req, res) => {
  try {
    const departmentStats = await pool.query(`
      SELECT d.name AS department_name, COUNT(*) AS resolved_count,
             AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/3600) AS avg_resolution_time_hours
      FROM issues i
      LEFT JOIN departments d ON i.department_id = d.id
      WHERE i.status='Resolved'
      GROUP BY d.name
    `);

    res.json(departmentStats.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Custom report
const generateCustomReport = async (req, res) => {
  const { fromDate, toDate, departmentId } = req.body;

  let query = 'SELECT * FROM issues WHERE created_at BETWEEN $1 AND $2';
  let params = [fromDate, toDate];

  if (departmentId) {
    query += ' AND department_id=$3';
    params.push(departmentId);
  }

  try {
    const reportData = await pool.query(query, params);
    res.json(reportData.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deactivateUser,
  getDashboardStats,
  getDepartmentStats,
  generateCustomReport
};
