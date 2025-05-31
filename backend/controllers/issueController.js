// const pool = require('../config/db');

// // Report a new issue (form-based or AR-based)
// const reportIssue = async (req, res) => {
//   const { userId, description, location, category, media, detectedType, estimatedSeverity } = req.body;
//   const issueType = detectedType || category; // Use detected type if AR-based, else use category
//   const severity = estimatedSeverity || 'Moderate'; // Default severity

//   try {
//     await pool.query(
//       'INSERT INTO issues (user_id, description, location, category, media, severity, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
//       [userId, description, location, issueType, media, severity, 'Pending']
//     );
//     res.status(201).json({ message: 'Issue reported successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get all issues
// const getIssues = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM issues ORDER BY id DESC');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get a single issue by ID
// const getIssueById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('SELECT * FROM issues WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Issue not found' });
//     }
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Accept issue by department official
// const acceptIssue = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       'UPDATE issues SET status = $1 WHERE id = $2 RETURNING *',
//       ['Assigned', id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Issue not found' });
//     }
//     res.json({ message: 'Issue accepted & assigned!', issue: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Decline issue by department official
// const declineIssue = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       'UPDATE issues SET status = $1 WHERE id = $2 RETURNING *',
//       ['Declined', id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Issue not found' });
//     }
//     res.json({ message: 'Issue declined.', issue: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Assign issue to field worker
// const assignIssue = async (req, res) => {
//   const { id } = req.params;
//   const { workerId } = req.body;
//   try {
//     const result = await pool.query(
//       'UPDATE issues SET assigned_to = $1, status = $2 WHERE id = $3 RETURNING *',
//       [workerId, 'In Progress', id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Issue not found' });
//     }
//     res.json({ message: 'Issue assigned to worker.', issue: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update issue status & comments (e.g., In Progress → Resolved)
// const updateIssueStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status, comments } = req.body;
//   try {
//     const result = await pool.query(
//       'UPDATE issues SET status = $1, comments = $2 WHERE id = $3 RETURNING *',
//       [status, comments, id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Issue not found' });
//     }
//     res.json({ message: 'Issue status & comments updated.', issue: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Delete issue (admin-only for now)
// const deleteIssue = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('DELETE FROM issues WHERE id = $1 RETURNING *', [id]);
//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: 'Issue not found or already deleted' });
//     }
//     res.json({ message: 'Issue deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   reportIssue,
//   getIssues,
//   getIssueById,
//   acceptIssue,
//   declineIssue,
//   assignIssue,
//   updateIssueStatus,
//   deleteIssue,
// };

// controllers/issueController.js
const pool = require('../config/db');

// Get all issues
exports.getIssues = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM issues ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
};

// Report new issue
exports.reportIssue = async (req, res) => {
  try {
    const { user_id, category, description, location } = req.body;
    const media = req.files ? req.files.map((f) => f.path) : [];

    const { rows } = await pool.query(
      `INSERT INTO issues (user_id, category, description, location, media)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id || 1, category, description, location, media]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to report issue' });
  }
};

// Get a single issue by ID
exports.getIssueById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM issues WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Accept issue by department official
exports.acceptIssue = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      'UPDATE issues SET status = $1 WHERE id = $2 RETURNING *',
      ['Assigned', id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json({ message: 'Issue accepted & assigned!', issue: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Decline issue by department official
exports.declineIssue = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      'UPDATE issues SET status = $1 WHERE id = $2 RETURNING *',
      ['Declined', id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json({ message: 'Issue declined.', issue: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Assign issue to field worker
exports.assignIssue = async (req, res) => {
  const { id } = req.params;
  const { workerId } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE issues SET assigned_to = $1, status = $2 WHERE id = $3 RETURNING *',
      [workerId, 'In Progress', id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json({ message: 'Issue assigned to worker.', issue: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update issue status & comments
exports.updateIssueStatus = async (req, res) => {
  const { id } = req.params;
  const { status, comments } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE issues SET status = $1, comments = $2 WHERE id = $3 RETURNING *',
      [status, comments, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json({ message: 'Issue status & comments updated.', issue: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete issue (admin only)
exports.deleteIssue = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM issues WHERE id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Issue not found or already deleted' });
    }
    res.json({ message: 'Issue deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
