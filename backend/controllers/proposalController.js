const pool = require('../config/db');

const createProposal = async (req, res) => {
  const { title, description, deadline, createdBy } = req.body;

  try {
    await pool.query(
      'INSERT INTO proposals (title, description, deadline, created_by) VALUES ($1, $2, $3, $4)',
      [title, description, deadline, createdBy]
    );
    res.status(201).json({ message: 'Proposal created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllProposals = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proposals');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProposalById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM proposals WHERE id=$1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Proposal not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProposal = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM proposals WHERE id=$1', [id]);
    res.json({ message: 'Proposal deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Keep this one if you want voting support later
const voteOnProposal = async (req, res) => {
  const { userId, proposalId, vote } = req.body;

  try {
    // Check if the proposal exists first
    const proposalCheck = await pool.query('SELECT id FROM proposals WHERE id = $1', [proposalId]);
    if (proposalCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Proposal not found!' });
    }

    // Insert the vote if proposal exists
    await pool.query(
      'INSERT INTO votes (user_id, proposal_id, vote) VALUES ($1, $2, $3)',
      [userId, proposalId, vote]
    );
    res.status(201).json({ message: 'Vote recorded!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProposalResults = async (req, res) => {
  const { id } = req.params;

  try {
    const proposalCheck = await pool.query('SELECT * FROM proposals WHERE id = $1', [id]);
    if (proposalCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    const result = await pool.query(
      `SELECT 
        vote,
        COUNT(*) as count
      FROM votes
      WHERE proposal_id = $1
      GROUP BY vote`,
      [id]
    );

    res.json(result.rows);  // returns: [{vote: true, count: 5}, {vote: false, count: 2}]
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProposal,
  getAllProposals,
  getProposalById,
  deleteProposal,
  voteOnProposal,
  getProposalResults
};
