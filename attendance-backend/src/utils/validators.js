// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
const isValidPassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

// Role validation
const isValidRole = (role) => {
  const validRoles = ['student', 'teacher', 'admin'];
  return validRoles.includes(role?.toLowerCase());
};

// Name validation
const isValidName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 100;
};

// Validate signup data
const validateSignup = (name, email, password, role) => {
  const errors = [];

  if (!isValidName(name)) {
    errors.push('Name must be between 2 and 100 characters');
  }

  if (!isValidEmail(email)) {
    errors.push('Invalid email format');
  }

  if (!isValidPassword(password)) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!isValidRole(role)) {
    errors.push('Invalid role. Must be student, teacher, or admin');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate login data
const validateLogin = (email, password) => {
  const errors = [];

  if (!email || !email.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Invalid email format');
  }

  if (!password || !password.trim()) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate course data
const validateCourse = (courseName, description, courseCode) => {
  const errors = [];

  if (!courseName || courseName.trim().length < 2) {
    errors.push('Course name must be at least 2 characters');
  }

  if (!courseCode || courseCode.trim().length < 2) {
    errors.push('Course code must be at least 2 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate session data
const validateSession = (courseId, date, startTime, endTime) => {
  const errors = [];

  if (!courseId || isNaN(courseId)) {
    errors.push('Valid course ID is required');
  }

  if (!date) {
    errors.push('Date is required');
  }

  if (!startTime) {
    errors.push('Start time is required');
  }

  if (!endTime) {
    errors.push('End time is required');
  }

  if (startTime && endTime && startTime >= endTime) {
    errors.push('End time must be after start time');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidRole,
  isValidName,
  validateSignup,
  validateLogin,
  validateCourse,
  validateSession
};

