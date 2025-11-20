const { getAllClassrooms, getClassroomById } = require('../models/queries');

// Get all classrooms
const getAll = async (req, res, next) => {
  try {
    const classrooms = await getAllClassrooms();

    res.json({
      success: true,
      data: classrooms
    });
  } catch (error) {
    next(error);
  }
};

// Get classroom by ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const classroom = await getClassroomById(id);

    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: 'Classroom not found'
      });
    }

    res.json({
      success: true,
      data: classroom
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById
};

