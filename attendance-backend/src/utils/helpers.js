// Format date to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format time to HH:MM:SS
const formatTime = (time) => {
  if (!time) return null;
  // If already in HH:MM format, add :00
  if (time.match(/^\d{2}:\d{2}$/)) {
    return `${time}:00`;
  }
  return time;
};

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return formatDate(new Date());
};

// Get current time in HH:MM:SS format
const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// Calculate attendance percentage
const calculateAttendancePercentage = (present, total) => {
  if (!total || total === 0) return 0;
  return ((present / total) * 100).toFixed(2);
};

// Sanitize string input
const sanitizeString = (str) => {
  if (!str) return '';
  return str.trim().replace(/[<>]/g, '');
};

// Generate random string
const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Parse query parameters for pagination
const parsePagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;
  
  return { page, limit, offset };
};

// Format response data
const formatResponse = (data, message = 'Success', success = true) => {
  return {
    success,
    message,
    data
  };
};

export {
  formatDate,
  formatTime,
  getCurrentDate,
  getCurrentTime,
  calculateAttendancePercentage,
  sanitizeString,
  generateRandomString,
  parsePagination,
  formatResponse
};

