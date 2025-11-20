const express = require('express');
const router = express.Router();
const { getAll, getById } = require('../controllers/classroomController');
const { verifyToken } = require('../middleware/auth');

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getById);

module.exports = router;

