import express from 'express';
import { getAll, getById, getByCourse, create } from '../controllers/sessionController.js';
import { verifyToken, requireTeacher } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getById);
router.get('/course/:courseId', verifyToken, getByCourse);
router.post('/', verifyToken, requireTeacher, create);

export default router;

