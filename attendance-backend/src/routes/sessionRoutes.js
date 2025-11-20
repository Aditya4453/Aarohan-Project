const express = require('express');
const router = express.Router();
const { getAll, getById, getByCourse, create } = require('../controllers/sessionController');
const { verifyToken, requireTeacher } = require('../middleware/auth');

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getById);
router.get('/course/:courseId', verifyToken, getByCourse);
router.post('/', verifyToken, requireTeacher, create);

module.exports = router;

