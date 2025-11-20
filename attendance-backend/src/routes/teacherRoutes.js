import express from 'express';
import { getAll, getById } from '../controllers/teacherController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getById);

export default router;

