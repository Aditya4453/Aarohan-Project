import express from 'express';
import { getAll, getByClassroom, updateStatus } from '../controllers/cameraController.js';
import { verifyToken, requireTeacher } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/classroom/:classroomId', verifyToken, getByClassroom);
router.put('/:id/status', verifyToken, requireTeacher, updateStatus);

export default router;

