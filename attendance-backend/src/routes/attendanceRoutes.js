const express = require('express');
const router = express.Router();
const { mark, getBySession, getByStudent, getBulk } = require('../controllers/attendanceController');
const { verifyToken, requireTeacher } = require('../middleware/auth');

// Protected routes
router.post('/', verifyToken, requireTeacher, mark);
router.get('/session/:sessionId', verifyToken, getBySession);
router.get('/student/:studentId', verifyToken, getByStudent);
router.get('/', verifyToken, getBulk);

module.exports = router;

