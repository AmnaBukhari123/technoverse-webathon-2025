const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { checkRole } = require('../middleware/roleMiddleware');

// Report new issue
router.post('/report-issue', checkRole(['citizen']), async (req, res) => {
  const { title, description, location, department_id } = req.body;
  const citizen_id = req.user.id;
  try {
    await pool.query(
      `INSERT INTO issues (title, description, location, citizen_id, department_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [title, description, location, citizen_id, department_id]
    );
    res.json({ message: 'Issue reported!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Track own issues
router.get('/my-issues', checkRole(['citizen']), async (req, res) => {
  const { id } = req.user;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM issues WHERE citizen_id = $1',
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
