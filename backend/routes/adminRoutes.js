const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

router.get('/users', verifyToken, checkRole(['admin']), adminController.getAllUsers);
router.put('/user/role', verifyToken, checkRole(['admin']), adminController.updateUserRole);
router.put('/user/deactivate', verifyToken, checkRole(['admin']), adminController.deactivateUser);
router.get('/dashboard', verifyToken, checkRole(['admin']), adminController.getDashboardStats);
router.get('/department-stats', verifyToken, checkRole(['admin']), adminController.getDepartmentStats);
router.post('/custom-report', verifyToken, checkRole(['admin']), adminController.generateCustomReport);

module.exports = router;
