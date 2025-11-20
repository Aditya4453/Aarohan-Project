import express from 'express';
import { getAll, getById, getAttendance } from '../controllers/studentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getById);
router.get('/:id/attendance', verifyToken, getAttendance);

export default router;

