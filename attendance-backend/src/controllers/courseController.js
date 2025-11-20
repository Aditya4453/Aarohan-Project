const { getAllCourses, getCourseById, createCourse, updateCourse } = require('../models/queries');
const { validateCourse } = require('../utils/validators');

// Get all courses
const getAll = async (req, res, next) => {
  try {
    const courses = await getAllCourses();

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// Get course by ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await getCourseById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// Create course
const create = async (req, res, next) => {
  try {
    const { course_name, description, course_code, credits } = req.body;

    // Validate input
    const validation = validateCourse(course_name, description, course_code);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    const courseId = await createCourse(
      course_name,
      description || null,
      course_code,
      credits || null
    );

    const course = await getCourseById(courseId);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// Update course
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { course_name, description, course_code, credits } = req.body;

    // Check if course exists
    const existingCourse = await getCourseById(id);
    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Validate input
    const validation = validateCourse(course_name, description, course_code);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    const updated = await updateCourse(
      id,
      course_name,
      description || null,
      course_code,
      credits || null
    );

    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'Failed to update course'
      });
    }

    const course = await getCourseById(id);

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update
};

