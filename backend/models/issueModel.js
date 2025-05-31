const pool = require('../config/db');

exports.createIssue = async (userId, description, location, category, media) => {
  const result = await pool.query(
    `INSERT INTO issues (user_id, description, location, category, media)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, description, location, category, media]
  );
  return result.rows[0];
};

exports.getAllIssues = async () => {
  const result = await pool.query(`SELECT * FROM issues`);
  return result.rows;
};

exports.getIssueById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.updateIssueStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE issues SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

exports.deleteIssue = async (id) => {
  await pool.query(`DELETE FROM issues WHERE id = $1`, [id]);
};
