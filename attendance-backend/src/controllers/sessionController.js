const { getAllSessions, getSessionById, getSessionsByCourse, createSession } = require('../models/queries');
const { validateSession } = require('../utils/validators');

// Get all sessions
const getAll = async (req, res, next) => {
  try {
    const sessions = await getAllSessions();

    res.json({
      success: true,
      data: sessions
    });
  } catch (error) {
    next(error);
  }
};

// Get session by ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const session = await getSessionById(id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    next(error);
  }
};

// Get sessions by course
const getByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const sessions = await getSessionsByCourse(courseId);

    res.json({
      success: true,
      data: sessions
    });
  } catch (error) {
    next(error);
  }
};

// Create session
const create = async (req, res, next) => {
  try {
    const { course_id, date, start_time, end_time, classroom_id, teacher_id } = req.body;

    // Validate input
    const validation = validateSession(course_id, date, start_time, end_time);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    // Use current user as teacher if not provided
    const sessionTeacherId = teacher_id || req.user.id;

    const sessionId = await createSession(
      course_id,
      date,
      start_time,
      end_time,
      classroom_id || null,
      sessionTeacherId
    );

    const session = await getSessionById(sessionId);

    res.status(201).json({
      success: true,
      message: 'Session created successfully',
      data: session
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  getByCourse,
  create
};

