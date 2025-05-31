const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { checkRole } = require('../middleware/roleMiddleware');

// Update issue status
router.post('/update-issue', checkRole(['official']), async (req, res) => {
  const { issue_id, status } = req.body;
  try {
    await pool.query(
      'UPDATE issues SET status = $1 WHERE id = $2',
      [status, issue_id]
    );
    res.json({ message: 'Issue status updated!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// View department-specific issues
router.get('/issues', checkRole(['official']), async (req, res) => {
  const { department_id } = req.user;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM issues WHERE department_id = $1',
      [department_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
