const { getAllStudents, getStudentById, getAttendanceByStudent } = require('../models/queries');

// Get all students
const getAll = async (req, res, next) => {
  try {
    const students = await getAllStudents();

    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    next(error);
  }
};

// Get student by ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

// Get student attendance
const getAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify student exists
    const student = await getStudentById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const attendance = await getAttendanceByStudent(id);

    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  getAttendance
};

