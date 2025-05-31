const pool = require('../config/db');

// Controller to get map data with optional filters
const getMapData = async (req, res) => {
  try {
    const { issueType, status, startDate, endDate } = req.query;

    let query = `
      SELECT id, description, location, category, status, media, created_at
      FROM issues
      WHERE 1=1
    `;
    const values = [];

    if (issueType) {
      values.push(issueType);
      query += ` AND category = $${values.length}`;
    }

    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }

    if (startDate && endDate) {
      values.push(startDate);
      values.push(endDate);
      query += ` AND created_at BETWEEN $${values.length - 1} AND $${values.length}`;
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting map data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMarkerDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, description, location, category, status, media, created_at FROM issues WHERE id=$1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Marker not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error getting marker details:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getMapData,
  getMarkerDetails
};
