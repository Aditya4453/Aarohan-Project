import express from 'express';
import { mark, getBySession, getByStudent, getBulk } from '../controllers/attendanceController.js';
import { verifyToken, requireTeacher } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', verifyToken, requireTeacher, mark);
router.get('/session/:sessionId', verifyToken, getBySession);
router.get('/student/:studentId', verifyToken, getByStudent);
router.get('/', verifyToken, getBulk);

export default router;

