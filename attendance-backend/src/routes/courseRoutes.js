import express from 'express';
import { getAll, getById, create, update } from '../controllers/courseController.js';
import { verifyToken, requireTeacher } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getById);
router.post('/', verifyToken, requireTeacher, create);
router.put('/:id', verifyToken, requireTeacher, update);

export default router;

