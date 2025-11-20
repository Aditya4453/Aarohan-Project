const { getAllCameras, getCamerasByClassroom, updateCameraStatus } = require('../models/queries');

// Get all cameras
const getAll = async (req, res, next) => {
  try {
    const cameras = await getAllCameras();

    res.json({
      success: true,
      data: cameras
    });
  } catch (error) {
    next(error);
  }
};

// Get cameras by classroom
const getByClassroom = async (req, res, next) => {
  try {
    const { classroomId } = req.params;

    const cameras = await getCamerasByClassroom(classroomId);

    res.json({
      success: true,
      data: cameras
    });
  } catch (error) {
    next(error);
  }
};

// Update camera status
const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // Validate status values
    const validStatuses = ['active', 'inactive', 'maintenance'];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Status must be active, inactive, or maintenance'
      });
    }

    const updated = await updateCameraStatus(id, status.toLowerCase());

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Camera not found'
      });
    }

    res.json({
      success: true,
      message: 'Camera status updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getByClassroom,
  updateStatus
};

