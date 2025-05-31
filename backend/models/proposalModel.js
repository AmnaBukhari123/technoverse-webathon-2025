const pool = require('../config/db');

exports.createProposal = async (title, description, deadline, createdBy) => {
  const result = await pool.query(
    `INSERT INTO proposals (title, description, deadline, created_by)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, description, deadline, createdBy]
  );
  return result.rows[0];
};

exports.getAllProposals = async () => {
  const result = await pool.query(`SELECT * FROM proposals`);
  return result.rows;
};

exports.getProposalById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM proposals WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.deleteProposal = async (id) => {
  await pool.query(`DELETE FROM proposals WHERE id = $1`, [id]);
};
