const { getAllTeachers, getTeacherById } = require('../models/queries');

// Get all teachers
const getAll = async (req, res, next) => {
  try {
    const teachers = await getAllTeachers();

    res.json({
      success: true,
      data: teachers
    });
  } catch (error) {
    next(error);
  }
};

// Get teacher by ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const teacher = await getTeacherById(id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      data: teacher
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById
};

