const pool = require('../config/db');

exports.voteOnProposal = async (userId, proposalId, vote) => {
  const result = await pool.query(
    `INSERT INTO votes (user_id, proposal_id, vote)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, proposal_id)
     DO UPDATE SET vote = $3
     RETURNING *`,
    [userId, proposalId, vote]
  );
  return result.rows[0];
};

exports.getVotesForProposal = async (proposalId) => {
  const result = await pool.query(
    `SELECT * FROM votes WHERE proposal_id = $1`,
    [proposalId]
  );
  return result.rows;
};
