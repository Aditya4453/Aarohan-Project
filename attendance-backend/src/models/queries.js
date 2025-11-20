const pool = require('../config/database');

// ==================== user ====================
const createUser = async (name, email, hashedPassword, role) => {
  const [result] = await pool.execute(
    'INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  );
  return result.insertId;
};

const getUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    'SELECT * FROM user WHERE email = ?',
    [email]
  );
  return rows[0];
};

const getUserById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT id, name, email, role, created_at FROM user WHERE id = ?',
    [id]
  );
  return rows[0];
};

// ==================== STUDENTS ====================
const getAllStudents = async () => {
  const [rows] = await pool.execute(
    `SELECT s.*, u.name, u.email 
     FROM students s 
     JOIN user u ON s.user_id = u.id 
     ORDER BY s.roll_number`
  );
  return rows;
};

const getStudentById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT s.*, u.name, u.email 
     FROM students s 
     JOIN user u ON s.user_id = u.id 
     WHERE s.student_id = ?`,
    [id]
  );
  return rows[0];
};

const getStudentByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT s.*, u.name, u.email 
     FROM students s 
     JOIN user u ON s.user_id = u.id 
     WHERE s.user_id = ?`,
    [userId]
  );
  return rows[0];
};

const createStudent = async (userId, rollNumber, department, year) => {
  const [result] = await pool.execute(
    'INSERT INTO students (user_id, roll_number, department, year) VALUES (?, ?, ?, ?)',
    [userId, rollNumber, department, year]
  );
  return result.insertId;
};

// ==================== TEACHERS ====================
const getAllTeachers = async () => {
  const [rows] = await pool.execute(
    `SELECT t.*, u.name, u.email 
     FROM teachers t 
     JOIN user u ON t.user_id = u.id 
     ORDER BY u.name`
  );
  return rows;
};

const getTeacherById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT t.*, u.name, u.email 
     FROM teachers t 
     JOIN user u ON t.user_id = u.id 
     WHERE t.teacher_id = ?`,
    [id]
  );
  return rows[0];
};

const getTeacherByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT t.*, u.name, u.email 
     FROM teachers t 
     JOIN user u ON t.user_id = u.id 
     WHERE t.user_id = ?`,
    [userId]
  );
  return rows[0];
};

const createTeacher = async (userId, department, employeeId) => {
  const [result] = await pool.execute(
    'INSERT INTO teachers (user_id, department, employee_id) VALUES (?, ?, ?)',
    [userId, department, employeeId]
  );
  return result.insertId;
};

// ==================== COURSES ====================
const getAllCourses = async () => {
  const [rows] = await pool.execute(
    'SELECT * FROM courses ORDER BY course_name'
  );
  return rows;
};

const getCourseById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM courses WHERE course_id = ?',
    [id]
  );
  return rows[0];
};

const createCourse = async (courseName, description, code, credits) => {
  const [result] = await pool.execute(
    'INSERT INTO courses (course_name, description, course_code, credits) VALUES (?, ?, ?, ?)',
    [courseName, description, code, credits]
  );
  return result.insertId;
};

const updateCourse = async (id, courseName, description, code, credits) => {
  const [result] = await pool.execute(
    'UPDATE courses SET course_name = ?, description = ?, course_code = ?, credits = ? WHERE course_id = ?',
    [courseName, description, code, credits, id]
  );
  return result.affectedRows > 0;
};

// ==================== SESSIONS ====================
const getAllSessions = async () => {
  const [rows] = await pool.execute(
    `SELECT s.*, c.course_name, c.course_code 
     FROM sessions s 
     JOIN courses c ON s.course_id = c.course_id 
     ORDER BY s.date DESC, s.start_time DESC`
  );
  return rows;
};

const getSessionById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT s.*, c.course_name, c.course_code 
     FROM sessions s 
     JOIN courses c ON s.course_id = c.course_id 
     WHERE s.session_id = ?`,
    [id]
  );
  return rows[0];
};

const getSessionsByCourse = async (courseId) => {
  const [rows] = await pool.execute(
    `SELECT s.*, c.course_name, c.course_code 
     FROM sessions s 
     JOIN courses c ON s.course_id = c.course_id 
     WHERE s.course_id = ? 
     ORDER BY s.date DESC, s.start_time DESC`,
    [courseId]
  );
  return rows;
};

const createSession = async (courseId, date, startTime, endTime, classroomId, teacherId) => {
  const [result] = await pool.execute(
    'INSERT INTO sessions (course_id, date, start_time, end_time, classroom_id, teacher_id) VALUES (?, ?, ?, ?, ?, ?)',
    [courseId, date, startTime, endTime, classroomId, teacherId]
  );
  return result.insertId;
};

// ==================== ATTENDANCE ====================
const markAttendance = async (studentId, sessionId, status, confidence, markedBy) => {
  const [result] = await pool.execute(
    'INSERT INTO attendance (student_id, session_id, status, confidence_score, marked_by, marked_at) VALUES (?, ?, ?, ?, ?, NOW())',
    [studentId, sessionId, status, confidence, markedBy]
  );
  return result.insertId;
};

const getAttendanceBySession = async (sessionId) => {
  const [rows] = await pool.execute(
    `SELECT a.*, s.roll_number, u.name as student_name 
     FROM attendance a 
     JOIN students s ON a.student_id = s.student_id 
     JOIN user u ON s.user_id = u.id 
     WHERE a.session_id = ? 
     ORDER BY u.name`,
    [sessionId]
  );
  return rows;
};

const getAttendanceByStudent = async (studentId) => {
  const [rows] = await pool.execute(
    `SELECT a.*, s.date, s.start_time, s.end_time, c.course_name, c.course_code 
     FROM attendance a 
     JOIN sessions s ON a.session_id = s.session_id 
     JOIN courses c ON s.course_id = c.course_id 
     WHERE a.student_id = ? 
     ORDER BY s.date DESC, s.start_time DESC`,
    [studentId]
  );
  return rows;
};

const getBulkAttendance = async (filters = {}) => {
  let query = `
    SELECT a.*, s.roll_number, u.name as student_name, 
           ses.date, ses.start_time, c.course_name 
    FROM attendance a 
    JOIN students s ON a.student_id = s.student_id 
    JOIN user u ON s.user_id = u.id 
    JOIN sessions ses ON a.session_id = ses.session_id 
    JOIN courses c ON ses.course_id = c.course_id 
    WHERE 1=1
  `;
  const params = [];

  if (filters.student_id) {
    query += ' AND a.student_id = ?';
    params.push(filters.student_id);
  }
  if (filters.session_id) {
    query += ' AND a.session_id = ?';
    params.push(filters.session_id);
  }
  if (filters.status) {
    query += ' AND a.status = ?';
    params.push(filters.status);
  }
  if (filters.course_id) {
    query += ' AND ses.course_id = ?';
    params.push(filters.course_id);
  }
  if (filters.date_from) {
    query += ' AND ses.date >= ?';
    params.push(filters.date_from);
  }
  if (filters.date_to) {
    query += ' AND ses.date <= ?';
    params.push(filters.date_to);
  }

  query += ' ORDER BY ses.date DESC, u.name';

  const [rows] = await pool.execute(query, params);
  return rows;
};

// ==================== CAMERAS ====================
const getAllCameras = async () => {
  const [rows] = await pool.execute(
    `SELECT c.*, cl.classroom_name 
     FROM cameras c 
     LEFT JOIN classrooms cl ON c.classroom_id = cl.classroom_id 
     ORDER BY c.camera_name`
  );
  return rows;
};

const getCamerasByClassroom = async (classroomId) => {
  const [rows] = await pool.execute(
    `SELECT c.*, cl.classroom_name 
     FROM cameras c 
     LEFT JOIN classrooms cl ON c.classroom_id = cl.classroom_id 
     WHERE c.classroom_id = ? 
     ORDER BY c.camera_name`,
    [classroomId]
  );
  return rows;
};

const updateCameraStatus = async (id, status) => {
  const [result] = await pool.execute(
    'UPDATE cameras SET status = ?, updated_at = NOW() WHERE camera_id = ?',
    [status, id]
  );
  return result.affectedRows > 0;
};

// ==================== CLASSROOMS ====================
const getAllClassrooms = async () => {
  const [rows] = await pool.execute(
    'SELECT * FROM classrooms ORDER BY classroom_name'
  );
  return rows;
};

const getClassroomById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM classrooms WHERE classroom_id = ?',
    [id]
  );
  return rows[0];
};

module.exports = {
  // user
  createUser,
  getUserByEmail,
  getUserById,
  
  // Students
  getAllStudents,
  getStudentById,
  getStudentByUserId,
  createStudent,
  
  // Teachers
  getAllTeachers,
  getTeacherById,
  getTeacherByUserId,
  createTeacher,
  
  // Courses
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  
  // Sessions
  getAllSessions,
  getSessionById,
  getSessionsByCourse,
  createSession,
  
  // Attendance
  markAttendance,
  getAttendanceBySession,
  getAttendanceByStudent,
  getBulkAttendance,
  
  // Cameras
  getAllCameras,
  getCamerasByClassroom,
  updateCameraStatus,
  
  // Classrooms
  getAllClassrooms,
  getClassroomById
};

