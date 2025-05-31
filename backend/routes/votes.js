const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// POST a vote
router.post('/', async (req, res) => {
  const { user_id, proposal_id, vote } = req.body;
  if (!user_id || !proposal_id || vote === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if the proposal exists
    const proposalCheck = await pool.query(
      'SELECT * FROM proposals WHERE id = $1',
      [proposal_id]
    );

    if (proposalCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    // Insert the vote
    const newVote = await pool.query(
      'INSERT INTO votes (user_id, proposal_id, vote) VALUES ($1, $2, $3) RETURNING *',
      [user_id, proposal_id, vote]
    );

    res.status(201).json(newVote.rows[0]);
  } catch (error) {
    console.error('Error inserting vote:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET votes for a proposal
router.get('/:proposal_id', async (req, res) => {
  const { proposal_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM votes WHERE proposal_id = $1',
      [proposal_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching votes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
