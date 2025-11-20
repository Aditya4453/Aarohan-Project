import { markAttendance, getAttendanceBySession, getAttendanceByStudent, getBulkAttendance } from '../models/queries.js';

// Mark attendance
const mark = async (req, res, next) => {
  try {
    const { student_id, session_id, status, confidence } = req.body;
    const markedBy = req.user.id;

    // Validate required fields
    if (!student_id || !session_id || !status) {
      return res.status(400).json({
        success: false,
        message: 'student_id, session_id, and status are required'
      });
    }

    // Validate status
    if (!['present', 'absent', 'late'].includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Status must be present, absent, or late'
      });
    }

    const attendanceId = await markAttendance(
      student_id,
      session_id,
      status.toLowerCase(),
      confidence || null,
      markedBy
    );

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: {
        attendance_id: attendanceId,
        student_id,
        session_id,
        status: status.toLowerCase()
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance by session
const getBySession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    const attendance = await getAttendanceBySession(sessionId);

    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance by student
const getByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const attendance = await getAttendanceByStudent(studentId);

    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

// Get bulk attendance with filters
const getBulk = async (req, res, next) => {
  try {
    const filters = {
      student_id: req.query.student_id ? parseInt(req.query.student_id) : null,
      session_id: req.query.session_id ? parseInt(req.query.session_id) : null,
      status: req.query.status || null,
      course_id: req.query.course_id ? parseInt(req.query.course_id) : null,
      date_from: req.query.date_from || null,
      date_to: req.query.date_to || null
    };

    const attendance = await getBulkAttendance(filters);

    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

export {
  mark,
  getBySession,
  getByStudent,
  getBulk
};

