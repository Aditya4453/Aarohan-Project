const express = require('express');
const router = express.Router();
const { getAll, getById, getAttendance } = require('../controllers/studentController');
const { verifyToken } = require('../middleware/auth');

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getById);
router.get('/:id/attendance', verifyToken, getAttendance);

module.exports = router;

