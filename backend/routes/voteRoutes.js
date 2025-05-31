const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.post('/:proposalId', voteController.voteOnProposal);
router.get('/:proposalId', voteController.getVotesForProposal);

module.exports = router;
