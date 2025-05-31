const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalController');

router.post('/', proposalController.createProposal);
router.get('/', proposalController.getAllProposals);
router.get('/:id', proposalController.getProposalById);
router.delete('/:id', proposalController.deleteProposal);
router.get('/:id/results', proposalController.getProposalResults);
router.post('/vote', proposalController.voteOnProposal);


module.exports = router;
