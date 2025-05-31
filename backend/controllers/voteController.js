const pool = require('../config/db');

// POST /:proposalId → Cast a vote
const voteOnProposal = async (req, res) => {
  const { proposalId } = req.params;
  const { user_id, vote } = req.body;

  if (typeof vote !== 'boolean') {
    return res.status(400).json({ message: 'Vote must be true or false' });
  }

  try {
    // ✅ Check if proposal exists
    const proposalCheck = await pool.query('SELECT id FROM proposals WHERE id=$1', [proposalId]);
    if (proposalCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Proposal not found' });
    }

    // ✅ Check if user already voted
    const existingVote = await pool.query(
      'SELECT * FROM votes WHERE proposal_id = $1 AND user_id = $2',
      [proposalId, user_id]
    );

    if (existingVote.rows.length > 0) {
      return res.status(409).json({ message: 'You have already voted on this proposal' });
    }

    // ✅ Insert vote
    await pool.query(
      'INSERT INTO votes (proposal_id, user_id, vote) VALUES ($1, $2, $3)',
      [proposalId, user_id, vote]
    );

    res.status(201).json({ message: 'Vote recorded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET /:proposalId → Get all votes (optional: return counts)
const getVotesForProposal = async (req, res) => {
  const { proposalId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        COUNT(*) FILTER (WHERE vote = true) AS upvotes,
        COUNT(*) FILTER (WHERE vote = false) AS downvotes
      FROM votes
      WHERE proposal_id = $1
      `,
      [proposalId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  voteOnProposal,
  getVotesForProposal,
};
