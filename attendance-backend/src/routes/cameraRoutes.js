const express = require('express');
const router = express.Router();
const { getAll, getByClassroom, updateStatus } = require('../controllers/cameraController');
const { verifyToken, requireTeacher } = require('../middleware/auth');

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/classroom/:classroomId', verifyToken, getByClassroom);
router.put('/:id/status', verifyToken, requireTeacher, updateStatus);

module.exports = router;

