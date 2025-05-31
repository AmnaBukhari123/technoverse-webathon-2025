const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Citizen reports an issue (form or AR-based)
router.post('/', issueController.reportIssue);

// Get all issues (Admin & Department view)
router.get('/', issueController.getIssues);

// Get single issue by ID
router.get('/:id', issueController.getIssueById);

// Department Official: Accept or decline issue
router.put('/:id/accept', issueController.acceptIssue);
router.put('/:id/decline', issueController.declineIssue);

// Department Official: Assign to a worker
router.put('/:id/assign', issueController.assignIssue);

// Department Official: Update status & add comments
router.put('/:id/update', issueController.updateIssueStatus);

// Delete issue by ID (Admin-only)
router.delete('/:id', issueController.deleteIssue);

module.exports = router;
