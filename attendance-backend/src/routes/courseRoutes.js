const express = require('express');
const router = express.Router();
const { getAll, getById, create, update } = require('../controllers/courseController');
const { verifyToken, requireTeacher } = require('../middleware/auth');

// Protected routes
router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getById);
router.post('/', verifyToken, requireTeacher, create);
router.put('/:id', verifyToken, requireTeacher, update);

module.exports = router;

